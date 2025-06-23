// routes/commentRoutes.js
import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// Şehre göre yorumları getir
router.get('/', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'Şehir adı gerekli.' });

  try {
    const comments = await Comment.find({ city }).sort({ date: 1 }); // tarihe göre sırala
    res.json(comments);
  } catch (err) {
    console.error('Yorumlar alınamadı:', err);
    res.status(500).json({ error: 'Yorumlar alınamadı.' });
  }
});

// Yeni yorum ekle
router.post('/', async (req, res) => {
  const { city, user, text, date } = req.body;

  if (!city || !text || !user) {
    return res.status(400).json({ error: 'Gerekli alanlar eksik.' });
  }

  try {
    const newComment = new Comment({ city, user, text, date: date || new Date() });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error('Yorum kaydedilemedi:', err);
    res.status(500).json({ error: 'Yorum kaydedilemedi.' });
  }
});

export default router;