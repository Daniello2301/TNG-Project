import { axiosConfig } from '../helpers/axios-conect';

export const getProducts = async () => {
    const products = await axiosConfig.get('api/products');
    return products;
}

export const getProduct = async (id) => {
    const products = await axiosConfig.get(`api/product/${id}`);
    return products;
}

export const createProduct = async (data) => {
    const response = await axiosConfig.post('api/product/create', data/*,  {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    } */);
    return response;
}
export const updateProduct = async (id,data) => {
    const response = await axiosConfig.put(`api/product/update/${id}`, data/*,  {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    } */);
    return response;
}

export const deleteProduct = async (id) => {
    const response = await axiosConfig.put(`api/product/delete/${id}`);
    return response;
}