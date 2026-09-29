import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getProductById,
    updateProduct
} from "../apis/productApi";

const EditProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: ""
    });

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProduct = async () => {
            try {

                setLoading(true);
                setError("");

                const response = await getProductById(id);

                setProduct({
                    name: response.data.name || "",
                    description: response.data.description || "",
                    price: response.data.price || "",
                    category: response.data.category || "",
                    stock: response.data.stock || ""
                });

            } catch (error) {

                console.log("GET PRODUCT ERROR:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch product"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

    }, [id]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setIsSubmitting(true);
            setError("");

            const formData = new FormData();

            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("category", product.category);
            formData.append("stock", product.stock);

            if (image) {
                formData.append("image", image);
            }

            const response = await updateProduct(id, formData);


            navigate("/products");

        } catch (error) {

            console.log("UPDATE PRODUCT ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to update product"
            );

        } finally {
            setIsSubmitting(false);
        }
    };


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading product...</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">

                <h1 className="mb-6 text-2xl font-bold">
                    Edit Product
                </h1>

                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3 outline-none"
                        />
                    </div>


                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
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
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3 outline-none"
                        />
                    </div>


                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3 outline-none"
                        />
                    </div>


                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3 outline-none"
                        />
                    </div>


                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Product Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full rounded-lg border p-3"
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Updating Product..."
                            : "Update Product"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditProduct;