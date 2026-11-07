
import {
  getAllOrganizationsPaymentAnalytics,
  getOrganizationPaymentAnalytics,
} from "../services/paymentAnalytics.services.js";

// ==========================================
// SUPER ADMIN
// Get analytics of all organizations
// ==========================================

export const getAllOrganizationsAnalyticsController = async (
  req,
  res
) => {
  try {
    const analytics = await getAllOrganizationsPaymentAnalytics();

    return res.status(200).json({
      success: true,
      message: "All organizations payment analytics fetched successfully",
      data: analytics,
    });
  } catch (error) {
    console.error("All Organizations Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch organizations payment analytics",
    });
  }
};

// ==========================================
// SUPER ADMIN
// Get analytics of a particular organization
// ==========================================

export const getOrganizationAnalyticsController = async (
  req,
  res
) => {
  try {
    const { organizationId } = req.params;

    const analytics = await getOrganizationPaymentAnalytics(
      organizationId
    );

    return res.status(200).json({
      success: true,
      message: "Organization payment analytics fetched successfully",
      data: analytics,
    });
  } catch (error) {
    if (error.message === "Invalid organization ID") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Organization not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Organization Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch organization payment analytics",
    });
  }
};

// ==========================================
// ORGANIZATION ADMIN
// Get analytics of their own organization
// ==========================================

export const getMyOrganizationAnalyticsController = async (
  req,
  res
) => {
  try {
    // Organization ID comes from the authenticated user
    const organizationId = req.user.organizationId;

    if (!organizationId) {
      return res.status(400).json({
        success: false,
        message: "Your account is not linked to an organization",
      });
    }

    const analytics = await getOrganizationPaymentAnalytics(
      organizationId
    );

    return res.status(200).json({
      success: true,
      message: "Your organization payment analytics fetched successfully",
      data: analytics,
    });
  } catch (error) {
    if (error.message === "Invalid organization ID") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Organization not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error("My Organization Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your organization payment analytics",
    });
  }
};
