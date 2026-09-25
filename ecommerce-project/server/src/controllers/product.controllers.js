import productModel from "../models/product.model.js";

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;

        const product = await productModel.create({ name, description, price, category, stock, image });

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