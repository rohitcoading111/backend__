import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, ImagePlus } from "lucide-react";

const AddProduct = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        console.log("PRODUCT DATA:", data);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">

                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="rounded-lg border border-gray-200 bg-white p-2 text-gray-700 transition hover:bg-gray-100"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Add Product
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a new product to your store
                        </p>
                    </div>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >

                    {/* Product Image */}
                    <div className="mb-6">

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Product Image
                        </label>

                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 transition hover:border-black">

                            <ImagePlus
                                size={40}
                                className="mb-3 text-gray-400"
                            />

                            <p className="text-sm font-medium text-gray-700">
                                Upload product image
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                PNG, JPG or WEBP
                            </p>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                {...register("image", {
                                    required: "Product image is required",
                                })}
                                className="hidden"
                            />

                        </label>

                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.image.message}
                            </p>
                        )}

                    </div>

                    {/* Product Name */}
                    <div className="mb-5">

                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Product Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter product name"
                            {...register("name", {
                                required: "Product name is required",
                            })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}

                    </div>

                    {/* Description */}
                    <div className="mb-5">

                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            rows="5"
                            placeholder="Describe your product..."
                            {...register("description", {
                                required: "Product description is required",
                            })}
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />

                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description.message}
                            </p>
                        )}

                    </div>

                    {/* Price + Stock */}
                    <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <div>

                            <label
                                htmlFor="price"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Price
                            </label>

                            <input
                                id="price"
                                type="number"
                                min="0"
                                placeholder="₹ Enter price"
                                {...register("price", {
                                    required: "Price is required",
                                    min: {
                                        value: 1,
                                        message: "Price must be greater than 0",
                                    },
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                            />

                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.price.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <label
                                htmlFor="stock"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Stock
                            </label>

                            <input
                                id="stock"
                                type="number"
                                min="0"
                                placeholder="Enter stock quantity"
                                {...register("stock", {
                                    required: "Stock is required",
                                    min: {
                                        value: 0,
                                        message: "Stock cannot be negative",
                                    },
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                            />

                            {errors.stock && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.stock.message}
                                </p>
                            )}

                        </div>

                    </div>

                    {/* Category */}
                    <div className="mb-8">

                        <label
                            htmlFor="category"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Category
                        </label>

                        <select
                            id="category"
                            {...register("category", {
                                required: "Category is required",
                            })}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        >

                            <option value="">
                                Select category
                            </option>

                            <option value="Electronics">
                                Electronics
                            </option>

                            <option value="Fashion">
                                Fashion
                            </option>

                            <option value="Accessories">
                                Accessories
                            </option>

                        </select>

                        {errors.category && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.category.message}
                            </p>
                        )}

                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Adding Product..."
                                : "Add Product"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddProduct;