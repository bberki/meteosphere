import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Bu e-posta zaten kullanılıyor.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Kayıt başarılı.' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // "identifier" = email veya username

    // Hem username hem email'e göre arama
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Geçersiz şifre.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        favoriteLocations: user.favoriteLocations,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};