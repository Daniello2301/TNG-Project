import { axiosConfig } from '../helpers/axios-conect';

export const login = async(data)=>{
    const  user = await axiosConfig.post('/auth', data);
    return user;
}

export const register = async(data)=>{
    const  user = await axiosConfig.post('/sign-up', data);
    return user;
}

export const getUsers = async()=>{
    const users = await axiosConfig.get('/users');
    return users;
}
