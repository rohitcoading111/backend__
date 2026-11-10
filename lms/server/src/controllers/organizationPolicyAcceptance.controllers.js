import {
  acceptCurrentOrganizationPolicies,
  getOrganizationPolicyStatus,
} from "../services/organizationPolicyAcceptance.services.js";

export const getOrganizationPolicyStatusController = async (req, res) => {
  try {
    const status = await getOrganizationPolicyStatus({
      organizationId: req.organization._id,
    });

    return res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error("Get organization policy status error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load current organization policies.",
    });
  }
};

export const acceptOrganizationPoliciesController = async (req, res) => {
  try {
    const acceptance = await acceptCurrentOrganizationPolicies({
      organizationId: req.organization._id,
      acceptedBy: req.organizationAdmin._id,
    });

    return res.status(200).json({
      success: true,
      message: "Policies accepted successfully.",
      data: acceptance,
    });
  } catch (error) {
    console.error("Accept organization policies error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to record policy acceptance.",
    });
  }
};
