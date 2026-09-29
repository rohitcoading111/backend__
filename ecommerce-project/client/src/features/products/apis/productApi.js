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

export const updateProduct = async (id, formData) => {
    const response = await axiosInstance.put(
        `/update/${id}`,
        formData
    );

    return response.data;
};

export const getProductById = async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axiosInstance.delete(
        `/delete/${id}`
    );

    return response.data;
};

export default getAllProduct;