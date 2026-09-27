import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "../components/Navbar";
import ProductCard from "../co

const Products = () => {


    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");


    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            description: "Premium wireless headphones with clear sound and deep bass.",
            price: 1999,
            category: "Electronics",
            stock: 15,
            rating: 4.5,
            reviews: 128,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        },
        {
            id: 2,
            name: "Smart Watch",
            description: "Modern smartwatch with fitness tracking and notifications.",
            price: 2499,
            category: "Electronics",
            stock: 8,
            rating: 4.3,
            reviews: 96,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        },
        {
            id: 3,
            name: "Running Shoes",
            description: "Comfortable lightweight running shoes for everyday use.",
            price: 1499,
            category: "Fashion",
            stock: 20,
            rating: 4.7,
            reviews: 210,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        },
        {
            id: 4,
            name: "Classic Backpack",
            description: "Durable backpack suitable for college, work and travel.",
            price: 999,
            category: "Accessories",
            stock: 12,
            rating: 4.4,
            reviews: 74,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        },
        {
            id: 5,
            name: "Gaming Keyboard",
            description: "Mechanical gaming keyboard with responsive switches.",
            price: 1799,
            category: "Electronics",
            stock: 0,
            rating: 4.6,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
        },
        {
            id: 6,
            name: "Denim Jacket",
            description: "Classic denim jacket with a comfortable modern fit.",
            price: 1299,
            category: "Fashion",
            stock: 10,
            rating: 4.2,
            reviews: 61,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
        },
    ];

    const categories = [
        "All",
        ...new Set(products.map((product) => product.category)),
    ];

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" || product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    return (
        <>
       
        <Navbar />
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            All Products
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Discover products you'll love
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">

                        <Search
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />

                    </div>
                </div>

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex flex-wrap gap-2">

                        {categories.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setCategory(item)}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                    category === item
                                        ? "bg-black text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {item}
                            </button>
                        ))}

                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <SlidersHorizontal size={18} />
                        {filteredProducts.length} products
                    </div>

                </div>

                {filteredProducts.length > 0 ? (

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-white">

                        <div className="text-center">

                            <h2 className="text-xl font-semibold text-gray-800">
                                No products found
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Try searching for something else.
                            </p>

                        </div>

                    </div>

                )}

            </div>
        </div>
         </>
    );
};

export default Products;