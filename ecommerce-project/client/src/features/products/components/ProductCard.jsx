import {
    ShoppingCart,
    Edit,
    Trash2,
    Star,
    Eye,
} from "lucide-react";

const ProductCard = ({ product }) => {
    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="relative h-56 overflow-hidden bg-gray-100">

                <img
                    src={product?.image || "https://via.placeholder.com/500"}
                    alt={product?.name || "Product"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                    {product?.category || "Product"}
                </span>

                {/* Stock */}
                <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
                        product?.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>

                <button
                    type="button"
                    className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 opacity-0 shadow-md transition group-hover:opacity-100 hover:bg-black hover:text-white"
                    title="View Product"
                >
                    <Eye size={18} />
                </button>
            </div>

            <div className="p-5">

                <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">
                    {product?.name || "Product Name"}
                </h2>

                <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-gray-500">
                    {product?.description || "Product description goes here."}
                </p>

                <div className="mt-3 flex items-center gap-1">
                    <Star
                        size={17}
                        className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-sm font-medium text-gray-700">
                        {product?.rating || "4.5"}
                    </span>

                    <span className="text-sm text-gray-400">
                        ({product?.reviews || 0} reviews)
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between">

                    <div>
                        <p className="text-2xl font-bold text-gray-900">
                            ₹{product?.price || 0}
                        </p>

                        <p className="text-xs text-gray-400">
                            {product?.stock || 0} items available
                        </p>
                    </div>

                </div>

                {/* Main Actions */}
                <div className="mt-5 flex gap-2">

                    <button
                        type="button"
                        disabled={!product?.stock}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        <ShoppingCart size={17} />
                        Add Cart
                    </button>

                    <button
                        type="button"
                        disabled={!product?.stock}
                        className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Buy Now
                    </button>

                </div>

                <div className="mt-3 flex gap-2">

                    <button
                        type="button"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                    >
                        <Edit size={16} />
                        Edit
                    </button>

                    <button
                        type="button"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ProductCard;