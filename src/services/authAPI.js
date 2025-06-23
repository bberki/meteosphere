import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api/auth'; // port backend server.js’te neyse ona göre

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Kayıt sırasında hata oluştu' };
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Giriş sırasında hata oluştu' };
  }
};