import productModel from "../models/product.model.js";
import imagekit from "../config/imagekit.js";


export const createProductController = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Product image is required"
            });
        }

        const uploadResponse = await imagekit.files.upload({
            file: req.file.buffer.toString("base64"),
            fileName: req.file.originalname
        });

        const product = await productModel.create({
            name,
            description,
            price,
            category,
            stock,
            image: uploadResponse.url
        });

        return res.status(201).json({
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        console.log("CREATE PRODUCT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find();

        return res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });

    } catch (error) {
        console.log("GET ALL PRODUCTS ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getSingleProductController = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            data: product
        });

    } catch (error) {
        console.log("GET SINGLE PRODUCT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;
        if (!req.file) {
        return res.status(400).json({
        message: "Image not found"
         });
      }
     const uploadResponse = await imagekit.files.upload({
       file: req.file.buffer.toString("base64"),
       fileName: req.file.originalname
       });

     const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    {
        name,
        description,
        price,
        category,
        stock,
        image:uploadResponse.url
    },
    {
        new: true
    }
)
     if (!updatedProduct) {
    return res.status(404).json({
        message: "Product not found"
    });
   } 
     return res.status(200).json({
        message:"product updated successfully",
        data:
            updatedProduct
        
     })

    } catch (error) {
        console.log("UPDATE PRODUCT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct
        });

    } catch (error) {
        console.log("DELETE PRODUCT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};