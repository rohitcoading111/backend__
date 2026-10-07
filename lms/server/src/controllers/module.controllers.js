import { createModule,updateModule,deleteModule } from "../services/module.services.js";

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

export const updateModuleController = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const module = await updateModule({
      moduleId,
      instructorId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      order: req.body.order,
    });

    return res.status(200).json({
      success: true,
      message: "Module updated successfully",
      data: {
        module,
      },
    });
  } catch (error) {
    console.error("Update Module Error:", error);

    if (error.message === "Module not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Access denied") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update module",
    });
  }
};


export const deleteModuleController = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const deletedModule = await deleteModule(
      moduleId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Module deleted successfully",
      data: {
        module: deletedModule,
      },
    });
  } catch (error) {
    console.error("Delete Module Error:", error);

    if (error.message === "Module not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Access denied") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete module",
    });
  }
};