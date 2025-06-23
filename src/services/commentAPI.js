// src/services/commentAPI.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api/comments';

// Şehre göre yorumları getir
export const fetchCommentsByCity = async (city) => {
  try {
    const res = await axios.get(`${BASE_URL}?city=${city}`);
    return res.data;
  } catch (err) {
    console.error('Yorumlar alınamadı:', err);
    throw new Error('Yorumlar alınamadı');
  }
};

// Yeni yorum ekle
export const postNewComment = async (commentData) => {
  try {
    const res = await axios.post(BASE_URL, commentData);
    return res.data;
  } catch (err) {
    console.error('Yorum gönderilemedi:', err);
    throw new Error('Yorum gönderilemedi');
  }
};