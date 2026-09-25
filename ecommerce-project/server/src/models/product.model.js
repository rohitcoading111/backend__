import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true,
            minLength: 10
        },

        price: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        stock: {
            type: Number,
            required: true
        },

        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;