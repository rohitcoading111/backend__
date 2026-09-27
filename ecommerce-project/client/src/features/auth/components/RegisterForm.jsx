import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        registerUser(data);
    };

    const password = watch("password");

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Create your ecommerce account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>

                        <input
                            {...register("name", {
                                required: "Name is required",
                            })}
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email",
                                },
                            })}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            })}
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />

                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="role"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Account Type
                        </label>

                        <select
                            {...register("role", {
                                required: "Role is required",
                            })}
                            id="role"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        >
                            <option value="">Select role</option>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>

                        {errors.role && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.role.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Create Account
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?

                    <span
                        onClick={() => navigate("/login")}
                        className="ml-1 cursor-pointer font-semibold text-black"
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
};

export default RegisterForm;