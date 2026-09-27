import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import {
    ShoppingCart,
    User,
    LogOut,
    Menu,
    X,
} from "lucide-react";

const Navbar = () => {
        const role = useSelector((state) => {
    return state.auth.user?.role;
});
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const user = {
        name: "Rohit Pandey",
        role: "seller",
    };

    const handleLogout = () => {
        console.log("Logout clicked");

    };

return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

            {/* Logo */}
            <Link
                to="/products"
                className="text-2xl font-bold tracking-tight text-gray-900"
            >
                Sky<span className="text-gray-500">Mart</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">

                <Link
                    to="/products"
                    className="text-sm font-medium text-gray-700 transition hover:text-black"
                >
                    Products
                </Link>

                <button
                    type="button"
                    className="text-sm font-medium text-gray-700 transition hover:text-black"
                >
                    Categories
                </button>

                {/* Seller Only */}
                {role === "seller" && (
                    <button
                        type="button"
                        onClick={() => navigate("/products/add")}
                        className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        + Add Product
                    </button>
                )}

            </div>

            {/* Right Side */}
            <div className="hidden items-center gap-3 md:flex">

                {/* Cart */}
                <button
                    type="button"
                    className="relative rounded-lg p-2 text-gray-700 transition hover:bg-gray-100"
                >
                    <ShoppingCart size={21} />

                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                        0
                    </span>
                </button>

                {/* User */}
                <div className="flex items-center gap-3 border-l border-gray-200 pl-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                        <User size={18} />
                    </div>

                    <div className="leading-tight">
                        <p className="text-sm font-semibold text-gray-900">
                            {user.name}
                        </p>

                        <p className="text-xs capitalize text-gray-500">
                            {user.role}
                        </p>
                    </div>

                </div>

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                    <LogOut size={17} />
                    Logout
                </button>

            </div>

            {/* Mobile Menu Button */}
            <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            >
                {isMenuOpen ? (
                    <X size={24} />
                ) : (
                    <Menu size={24} />
                )}
            </button>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">

                <div className="flex flex-col gap-3">

                    <Link
                        to="/products"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100"
                    >
                        Products
                    </Link>

                    <button
                        type="button"
                        className="rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-gray-100"
                    >
                        Categories
                    </button>

                    {/* Seller Only - Mobile */}
                    {role === "seller" && (
                        <button
                            type="button"
                            onClick={() => {
                                navigate("/products/add");
                                setIsMenuOpen(false);
                            }}
                            className="rounded-lg bg-black px-3 py-2 text-left text-sm font-semibold text-white"
                        >
                            + Add Product
                        </button>
                    )}

                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100"
                    >
                        <ShoppingCart size={18} />
                        Cart
                    </button>

                    <div className="my-1 border-t border-gray-200" />

                    <div className="flex items-center gap-3 px-3 py-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                            <User size={18} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold">
                                {user.name}
                            </p>

                            <p className="text-xs capitalize text-gray-500">
                                {user.role}
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </div>
        )}

    </nav>
);


};

export default Navbar;