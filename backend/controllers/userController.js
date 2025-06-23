import User from '../models/User.js';

export const addFavoriteLocation = async (req, res) => {
  console.log("API HİT: addFavoriteLocation");

  const userId = req.params.id;
  const city = req.body.city?.trim();

  console.log("Gelen body:", req.body);
  if (!city) return res.status(400).json({ message: 'Geçersiz şehir' });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Kullanıcı yok' });
    if (!user.favoriteLocations.includes(city)) {
      user.favoriteLocations.push(city);
      await user.save();
    }
    res.status(200).json({ favoriteLocations: user.favoriteLocations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hata', error: err });
  }
};

export const removeFavoriteLocation = async (req, res) => {
  const userId = req.params.id;
  const city = req.query.city?.trim();
  if (!city) return res.status(400).json({ message: 'Geçersiz şehir' });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Kullanıcı yok' });
    user.favoriteLocations = user.favoriteLocations.filter(
      c => c.trim().toLowerCase() !== city.toLowerCase()
    );
    await user.save();
    res.status(200).json({ favoriteLocations: user.favoriteLocations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hata', error: err });
  }
};