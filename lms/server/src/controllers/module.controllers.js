import { createModule } from "../services/module.services.js";

export const createModuleController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const module = await createModule({
      courseId,
      instructorId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      order: req.body.order,
    });

    return res.status(201).json({
      success: true,
      message: "Module created successfully",
      data: {
        module,
      },
    });
  } catch (error) {
    console.error("Create Module Error:", error);

    if (error.message === "Course not found or access denied") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Module order already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create module",
    });
  }
};