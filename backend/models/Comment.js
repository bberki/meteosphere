// models/Comment.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  user: {
    type: String, 
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Comment', CommentSchema);