
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        login(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Login to your account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="role"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Login as
                        </label>

                        <select
                            id="role"
                            {...register("role")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        >
                            <option value="">Select role</option>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?

                    <span
                        onClick={() => navigate("/register")}
                        className="ml-1 cursor-pointer font-semibold text-black"
                    >
                        Register
                    </span>
                </p>

            </div>
        </div>
    );
};


export default LoginForm