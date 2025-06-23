// controllers/commentController.js
import Comment from '../models/Comment.js';

// Şehre göre yorumları getir
export const getCommentsByCity = async (req, res) => {
  const { city } = req.query;
  try {
    const comments = await Comment.find({ city }).sort({ date: 1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Yorumlar alınamadı.', error: err.message });
  }
};

// Yeni yorum ekle
export const postComment = async (req, res) => {
  const { city, user, text, date } = req.body;

  if (!city || !user || !text) {
    return res.status(400).json({ message: 'Eksik alanlar var.' });
  }

  try {
    const newComment = new Comment({ city, user, text, date });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Yorum eklenemedi.', error: err.message });
  }
};