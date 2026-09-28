import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, SlidersHorizontal } from "lucide-react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard.jsx";
import getAllProduct from "../apis/productApi.js";
import { setProducts } from "../state/productSlice.js";

const Products = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const dispatch = useDispatch();
    const products = useSelector(
        (state) => state.product.products
    );

    const loading = useSelector(
        (state) => state.product.loading
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProduct();

                console.log("PRODUCTS RESPONSE:", response);

                dispatch(setProducts(response.data));
            } catch (error) {
                console.log("PRODUCTS ERROR:", error);
            }
        };

        fetchProducts();
    }, [dispatch]);

    const categories = [
        "All",
        ...new Set(
            products.map((product) => product.category)
        ),
    ];

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" ||
                product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);


    const role = useSelector((state) => state.auth.user?.role);

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
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
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
                                    onClick={() =>
                                        setCategory(item)
                                    }
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


                    {loading && (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <p className="text-gray-500">
                                Loading products...
                            </p>
                        </div>
                    )}

  
                    {!loading && filteredProducts.length > 0 && (

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {filteredProducts.map((product) => (

                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    role={role}
                                />

                            ))}

                        </div>

                    )}

                    {!loading && filteredProducts.length === 0 && (

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