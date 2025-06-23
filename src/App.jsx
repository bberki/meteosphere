import { useState, useEffect } from 'react';
import './styles/App.css';
import SearchBar from './components/SearchBar';
import WeatherCarousel from './components/WeatherCarousel';
import AuthPage from './pages/AuthPage';
import CommentModal from './components/CommentModal';
import { addFavoriteCity, removeFavoriteCity } from './services/userAPI';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherList, setWeatherList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const p = JSON.parse(stored);
      const parsedUser = {
        ...p,
        id: p._id,
        favoriteLocations: Array.isArray(p.favoriteLocations) ? p.favoriteLocations : []
      };
      setUser(parsedUser);
      setIsLoggedIn(true);

      fetchFavorites(parsedUser.favoriteLocations);
    }
  }, []);

  const fetchFavorites = async (locations) => {
    const responses = await Promise.all(
      locations.map(city =>
        fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
          .then(res => res.json())
          .catch(() => null)
      )
    );
    const validData = responses.filter(Boolean);
    setWeatherList(validData);
    setActiveIndex(validData.length > 0 ? 0 : null);
  };

  const handleWeatherFetched = (data) => {
    const name = data.location.name.toLowerCase();
    if (weatherList.some(w => w.location.name.toLowerCase() === name)) return;
    setWeatherList(prev => [...prev, data]);
    if (activeIndex === null) setActiveIndex(0);
  };

  const handleDeleteCard = (idx) => {
    setWeatherList(prev => {
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
    setActiveIndex(ai => {
      if (ai === idx) return null;
      if (ai > idx) return ai - 1;
      return ai;
    });
  };

  useEffect(() => {
    const desc = weatherList[activeIndex]?.current?.condition?.text?.toLowerCase() || '';
    let cls = 'bg-default';
    if (desc.includes('thunder')) cls = 'bg-thunder';
    else if (desc.includes('snow')) cls = 'bg-snowy';
    else if (desc.includes('rain')) cls = 'bg-rainy';
    else if (desc.includes('cloud')) cls = 'bg-cloudy';
    else if (desc.includes('mist') || desc.includes('fog')) cls = 'bg-foggy';
    else if (desc.includes('sunny') || desc.includes('clear')) cls = 'bg-sunny';
    document.body.className = cls;
  }, [activeIndex, weatherList]);

  const handleAuthSuccess = async (u) => {
    console.log("Kullanici verisi: ", u);

    localStorage.setItem('user', JSON.stringify(u));
    const updatedUser = { ...u, id: u._id, favoriteLocations: u.favoriteLocations || [] };
    setUser(updatedUser);
    setIsLoggedIn(true);
    setShowAuthPage(false);
    fetchFavorites(updatedUser.favoriteLocations);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setWeatherList([]);
  };

  const handleToggleFavoriteCard = async (city) => {
    if (!user?.id) return;
    try {
      let favs;
      if (user.favoriteLocations.includes(city)) {
        favs = (await removeFavoriteCity(user.id, city)).favoriteLocations;
        console.log("Favorilerden Cikarildi");
      } else {
        favs = (await addFavoriteCity(user.id, city)).favoriteLocations;
        console.log("Favorilere eklendi");
      }
      const updatedUser = { ...user, favoriteLocations: favs };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (e) {
      console.error(e);
      alert('Favori işleminde hata oluştu.');
    }
  };

  const handleCommentCard = (city) => {
    if (!isLoggedIn) return alert('Yorumlar için giriş yapın.');
    setSelectedCity(city);
    setShowCommentModal(true);
  };

  return (
    <>
      <div className="top-right flex items-center gap-2 text-white font-semibold">
        {isLoggedIn ? (
          <>
            <span className="user-greeting">Merhaba, {user.username}</span>
            <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
          </>
        ) : (
          <button onClick={() => setShowAuthPage(true)} className="login-button">Giriş Yap</button>
        )}
      </div>

      {showAuthPage ? (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      ) : (
        <div className="container mx-auto p-5 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow">🌤️ Meteosphere</h1>
          <SearchBar onWeatherFetched={handleWeatherFetched} />
          {weatherList.length > 0 && (
            <WeatherCarousel
              weatherList={weatherList}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onDeleteCard={handleDeleteCard}
              onCommentCard={handleCommentCard}
              onToggleFavoriteCard={handleToggleFavoriteCard}
              user={user}
            />
          )}
        </div>
      )}

      {showCommentModal && (
        <CommentModal
          city={selectedCity}
          user={user}
          onClose={() => setShowCommentModal(false)}
        />
      )}
    </>
  );
}

export default App;