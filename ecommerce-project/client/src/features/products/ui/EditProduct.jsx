
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProductById } from "../apis/productApi";

const EditProduct = () => {

    const { id } = useParams();

 useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await getProductById(id);

            console.log("PRODUCT:", response);
        } catch (error) {
            console.log("GET PRODUCT ERROR:", error);
        }
    };

    fetchProduct();
}, [id]);
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">

                <h1 className="mb-6 text-2xl font-bold">
                    Edit Product
                </h1>

                <form className="space-y-5">

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Product Name
                        </label>

                        <input
                            type="text"
                            className="w-full rounded-lg border p-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Description
                        </label>

                        <textarea
                            className="w-full rounded-lg border p-3 outline-none"
                            rows="4"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            className="w-full rounded-lg border p-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Category
                        </label>

                        <input
                            type="text"
                            className="w-full rounded-lg border p-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Stock
                        </label>

                        <input
                            type="number"
                            className="w-full rounded-lg border p-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Product Image
                        </label>

                        <input
                            type="file"
                            className="w-full rounded-lg border p-3"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800"
                    >
                        Update Product
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditProduct;