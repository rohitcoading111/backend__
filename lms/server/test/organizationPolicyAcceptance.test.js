import assert from "node:assert/strict";
import { test } from "node:test";

import {
  createRequireOrganizationPolicyAcceptance,
} from "../src/middleware/requireOrganizationPolicyAcceptance.middleware.js";
import {
  createOrganizationPolicyAcceptanceService,
} from "../src/services/organizationPolicyAcceptance.services.js";
import {
  validatePolicyAcceptanceRequest,
} from "../src/validators/organizationPolicyAcceptance.validators.js";
import { organizationAdminMiddleware } from "../src/middleware/organizationAdmin.middleware.js";
import { requireOrganizationPolicyAcceptance } from "../src/middleware/requireOrganizationPolicyAcceptance.middleware.js";
import organizationRoutes from "../src/routes/organization.routes.js";
import organizationInstructorRoutes from "../src/routes/organizationInstructor.routes.js";
import paymentAnalyticsRoutes from "../src/routes/paymentAnalytics.routes.js";
import organizationBankDetailsRoutes from "../src/routes/organizationBankDetails.routes.js";
import organizationPolicyRoutes from "../src/routes/organizationPolicyAcceptance.routes.js";

const policies = { termsVersion: "2.0", securityVersion: "1.1" };

const createResponse = () => ({
  statusCode: null,
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
});

test("policy status is scoped to the trusted organization and current versions", async () => {
  let query;
  const service = createOrganizationPolicyAcceptanceService({
    acceptanceModel: {
      findOne(filter) {
        query = filter;
        return { lean: async () => null };
      },
    },
    policies,
  });

  const status = await service.getStatus({ organizationId: "org-a" });

  assert.deepEqual(query, {
    organization: "org-a",
    termsVersion: "2.0",
    securityVersion: "1.1",
  });
  assert.equal(status.accepted, false);
  assert.equal(status.termsVersion, "2.0");
  assert.equal(status.securityVersion, "1.1");
});

test("acceptance is created once for the current organization policy pair", async () => {
  let update;
  const acceptedAt = new Date();
  const service = createOrganizationPolicyAcceptanceService({
    acceptanceModel: {
      findOneAndUpdate(filter, change, options) {
        update = { filter, change, options };
        return { lean: async () => ({ acceptedAt }) };
      },
    },
    policies,
  });

  const acceptance = await service.accept({
    organizationId: "org-a",
    acceptedBy: "admin-a",
  });

  assert.deepEqual(update.filter, {
    organization: "org-a",
    termsVersion: "2.0",
    securityVersion: "1.1",
  });
  assert.equal(update.change.$setOnInsert.acceptedBy, "admin-a");
  assert.equal(update.change.$setOnInsert.acceptedAt instanceof Date, true);
  assert.equal(update.options.upsert, true);
  assert.equal(acceptance.accepted, true);
  assert.equal(acceptance.acceptedAt, acceptedAt);
});

test("previous-version acceptance does not satisfy the latest policy versions", async () => {
  let queriedVersions;
  const service = createOrganizationPolicyAcceptanceService({
    acceptanceModel: {
      findOne(filter) {
        queriedVersions = {
          termsVersion: filter.termsVersion,
          securityVersion: filter.securityVersion,
        };
        return { lean: async () => null };
      },
    },
    policies,
  });

  const status = await service.getStatus({ organizationId: "org-a" });

  assert.deepEqual(queriedVersions, policies);
  assert.equal(status.accepted, false);
});

test("duplicate simultaneous acceptance upserts return the saved record", async () => {
  const acceptance = { acceptedAt: new Date() };
  let readAfterDuplicate = false;
  const service = createOrganizationPolicyAcceptanceService({
    acceptanceModel: {
      findOneAndUpdate() {
        const duplicateError = new Error("Duplicate key");
        duplicateError.code = 11000;
        return { lean: async () => { throw duplicateError; } };
      },
      findOne(filter) {
        readAfterDuplicate = true;
        assert.deepEqual(filter, {
          organization: "org-a",
          termsVersion: policies.termsVersion,
          securityVersion: policies.securityVersion,
        });
        return { lean: async () => acceptance };
      },
    },
    policies,
  });

  const result = await service.accept({
    organizationId: "org-a",
    acceptedBy: "admin-a",
  });

  assert.equal(readAfterDuplicate, true);
  assert.equal(result.acceptedAt, acceptance.acceptedAt);
});

test("policy middleware denies unaccepted or outdated policy versions with structured 403", async () => {
  const middleware = createRequireOrganizationPolicyAcceptance({
    getStatus: async () => ({
      accepted: false,
      termsVersion: "2.0",
      securityVersion: "1.1",
    }),
    policies,
  });
  const req = {
    organization: { _id: "org-a" },
    organizationAdmin: { _id: "admin-a" },
  };
  const res = createResponse();
  let continued = false;

  await middleware(req, res, () => {
    continued = true;
  });

  assert.equal(res.statusCode, 403);
  assert.equal(res.body.code, "POLICY_ACCEPTANCE_REQUIRED");
  assert.deepEqual(res.body.data, policies);
  assert.equal(continued, false);
});

test("policy middleware checks the organization set by authorization, never request body ids", async () => {
  let checkedOrganization;
  const middleware = createRequireOrganizationPolicyAcceptance({
    getStatus: async ({ organizationId }) => {
      checkedOrganization = organizationId;
      return { accepted: true };
    },
    policies,
  });
  const req = {
    body: { organizationId: "attacker-org" },
    organization: { _id: "authorized-org" },
    organizationAdmin: { _id: "admin-a" },
  };
  const res = createResponse();
  let continued = false;

  await middleware(req, res, () => {
    continued = true;
  });

  assert.equal(checkedOrganization, "authorized-org");
  assert.equal(continued, true);
});

test("acceptance from another organization does not unlock the current organization", async () => {
  const middleware = createRequireOrganizationPolicyAcceptance({
    getStatus: async ({ organizationId }) => ({
      accepted: organizationId === "org-a",
    }),
    policies,
  });
  const req = {
    organization: { _id: "org-b" },
    organizationAdmin: { _id: "admin-b" },
  };
  const res = createResponse();
  let continued = false;

  await middleware(req, res, () => {
    continued = true;
  });

  assert.equal(res.statusCode, 403);
  assert.equal(res.body.code, "POLICY_ACCEPTANCE_REQUIRED");
  assert.equal(continued, false);
});

test("policy gate fails closed when organization authorization context is missing", async () => {
  const middleware = createRequireOrganizationPolicyAcceptance({
    getStatus: async () => {
      throw new Error("Must not query without trusted organization context");
    },
    policies,
  });
  const res = createResponse();

  await middleware({}, res, () => {
    assert.fail("Middleware must not continue without trusted organization context.");
  });

  assert.equal(res.statusCode, 403);
  assert.equal(res.body.success, false);
});

test("acceptance validator rejects client-selected identities and policy versions", () => {
  const res = createResponse();
  let continued = false;

  validatePolicyAcceptanceRequest(
    {
      body: {
        organizationId: "attacker-org",
        termsVersion: "999",
        acceptedBy: "attacker-user",
      },
    },
    res,
    () => {
      continued = true;
    }
  );

  assert.equal(res.statusCode, 400);
  assert.equal(continued, false);
});

test("all organization-admin routes are gated after organization authorization; policy and super-admin routes are exempt", () => {
  const organizationAdminRouters = [
    organizationRoutes,
    organizationInstructorRoutes,
    paymentAnalyticsRoutes,
    organizationBankDetailsRoutes,
  ];

  for (const router of organizationAdminRouters) {
    for (const layer of router.stack.filter((entry) => entry.route)) {
      const handlers = layer.route.stack.map((entry) => entry.handle);
      const authorizationIndex = handlers.indexOf(organizationAdminMiddleware);
      if (authorizationIndex < 0) continue;

      const policyIndex = handlers.indexOf(requireOrganizationPolicyAcceptance);
      assert.notEqual(policyIndex, -1, `${layer.route.path} must enforce acceptance`);
      assert.ok(policyIndex > authorizationIndex);
    }
  }

  for (const layer of organizationPolicyRoutes.stack.filter((entry) => entry.route)) {
    assert.equal(
      layer.route.stack.some(
        (entry) => entry.handle === requireOrganizationPolicyAcceptance
      ),
      false
    );
    assert.ok(
      layer.route.stack.some(
        (entry) => entry.handle === organizationAdminMiddleware
      )
    );
  }

  for (const router of [paymentAnalyticsRoutes, organizationBankDetailsRoutes]) {
    for (const layer of router.stack.filter((entry) => entry.route)) {
      if (layer.route.path.includes("super-admin")) {
        assert.equal(
          layer.route.stack.some(
            (entry) => entry.handle === requireOrganizationPolicyAcceptance
          ),
          false
        );
      }
    }
  }
});
