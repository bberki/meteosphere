import axios from 'axios';
const BASE = 'http://localhost:5001/api';

export const addFavoriteCity = async (userId, city) => {
  const normalized = city.trim();
  const res = await axios.post(`${BASE}/users/${userId}/favorites`, { city: normalized });
  return res.data; // ✅ .data'yı burada dönüyoruz
};

export const removeFavoriteCity = async (userId, city) => {
  const normalized = city.trim();
  const res = await axios.delete(`${BASE}/users/${userId}/favorites`, {
    params: { city: normalized }
  });
  return res.data; // ✅
};