import OrganizationPolicyAcceptance from "../models/organizationPolicyAcceptance.models.js";
import organizationPolicies from "../config/organizationPolicies.config.js";

export const createOrganizationPolicyAcceptanceService = ({
  acceptanceModel,
  policies,
}) => ({
  async getStatus({ organizationId }) {
    const acceptance = await acceptanceModel.findOne({
      organization: organizationId,
      termsVersion: policies.termsVersion,
      securityVersion: policies.securityVersion,
    }).lean();

    return {
      termsVersion: policies.termsVersion,
      securityVersion: policies.securityVersion,
      accepted: Boolean(acceptance),
      acceptedAt: acceptance?.acceptedAt || null,
    };
  },

  async accept({ organizationId, acceptedBy }) {
    const filter = {
      organization: organizationId,
      termsVersion: policies.termsVersion,
      securityVersion: policies.securityVersion,
    };

    let acceptance;
    try {
      acceptance = await acceptanceModel.findOneAndUpdate(
        filter,
        {
          $setOnInsert: {
            acceptedBy,
            acceptedAt: new Date(),
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      ).lean();
    } catch (error) {
      if (error.code !== 11000) throw error;
      acceptance = await acceptanceModel.findOne(filter).lean();
      if (!acceptance) throw error;
    }

    if (!acceptance) {
      throw new Error("Policy acceptance record was not returned.");
    }

    return {
      termsVersion: policies.termsVersion,
      securityVersion: policies.securityVersion,
      accepted: true,
      acceptedAt: acceptance.acceptedAt,
    };
  },
});

const policyAcceptanceService = createOrganizationPolicyAcceptanceService({
  acceptanceModel: OrganizationPolicyAcceptance,
  policies: organizationPolicies,
});

export const getOrganizationPolicyStatus =
  policyAcceptanceService.getStatus;
export const acceptCurrentOrganizationPolicies =
  policyAcceptanceService.accept;
