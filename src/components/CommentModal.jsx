// src/components/CommentModal.jsx

import { useState, useEffect } from 'react';
import { fetchCommentsByCity, postNewComment } from '../services/commentAPI';

function CommentModal({ city, user, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Yorumları yükle
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchCommentsByCity(city);
        setComments(data);
      } catch (err) {
        console.error('Yorumlar alınamadı:', err);
      }
    };

    if (city) loadComments();
  }, [city]);

  // Yorum gönder
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      city,
      user: user?.username || 'Anonim',
      text: newComment,
      date: new Date().toISOString(),
    };

    try {
      const savedComment = await postNewComment(commentData);
      setComments((prev) => [...prev, savedComment]);
      setNewComment('');
    } catch (err) {
      console.error('Yorum gönderilemedi:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{city}</h2>

        <div className="modal-comments">
          {comments.length > 0 ? (
            comments
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((c, i) => (
                <div key={i} className="modal-comment">
                  <strong>{c.user}:</strong> {c.text}
                </div>
              ))
          ) : (
            <p className="modal-empty">Henüz yorum yok.</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Yorumunuzu yazın..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="modal-input"
          />
          <button type="submit" className="modal-submit">Gönder</button>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;