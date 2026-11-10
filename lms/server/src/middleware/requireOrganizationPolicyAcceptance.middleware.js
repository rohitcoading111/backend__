import organizationPolicies from "../config/organizationPolicies.config.js";
import {
  getOrganizationPolicyStatus,
} from "../services/organizationPolicyAcceptance.services.js";

export const createRequireOrganizationPolicyAcceptance = ({
  getStatus = getOrganizationPolicyStatus,
  policies = organizationPolicies,
}) => async (req, res, next) => {
  try {
    if (!req.organization?._id || !req.organizationAdmin?._id) {
      return res.status(403).json({
        success: false,
        message: "Organization Admin authorization is required.",
      });
    }

    const status = await getStatus({
      organizationId: req.organization?._id,
    });

    if (!status.accepted) {
      return res.status(403).json({
        success: false,
        code: "POLICY_ACCEPTANCE_REQUIRED",
        message:
          "Please accept the latest Terms & Conditions and Security & Privacy Policy.",
        data: {
          termsVersion: policies.termsVersion,
          securityVersion: policies.securityVersion,
        },
      });
    }

    return next();
  } catch (error) {
    console.error("Organization policy acceptance check error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify organization policy acceptance.",
    });
  }
};

export const requireOrganizationPolicyAcceptance =
  createRequireOrganizationPolicyAcceptance({});
