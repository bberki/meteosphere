import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
    app.listen(PORT, () => console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`));
  })
  .catch(err => console.error(err));