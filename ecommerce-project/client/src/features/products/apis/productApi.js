import axiosInstance from "../../../config/axiosInstance";

const getAllProduct = async () => {
    const response = await axiosInstance.get("/allproducts");

    return response.data;
};

export const createProduct = async (formData) => {
    const response = await axiosInstance.post(
        "/products",
        formData
    );

    return response.data;
};
export default getAllProduct;