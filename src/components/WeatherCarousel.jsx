import React, { useState, useEffect } from 'react';
import { FaTrash, FaRegCommentDots, FaStar } from 'react-icons/fa';

function WeatherCarousel({
  weatherList,
  activeIndex,
  setActiveIndex,
  onDeleteCard,
  onCommentCard,
  onToggleFavoriteCard,
  user
}) {
  const getVisibleCount = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = weatherList.length;
  const V = visibleCount;
  const offset = Math.floor(V / 2);

  const start = Math.min(
    Math.max(activeIndex - offset, 0),
    Math.max(total - V, 0)
  );
  const visible = weatherList.slice(start, start + V);

  const goPrev = () => activeIndex > 0 && setActiveIndex(activeIndex - 1);
  const goNext = () => activeIndex < total - 1 && setActiveIndex(activeIndex + 1);

  return (
    <div className="carousel-wrapper">
      <button onClick={goPrev} disabled={activeIndex === 0} className="carousel-btn">←</button>
      <div className="carousel-cards">
        {visible.map((w, i) => {
          const idx = start + i;
          const isActive = idx === activeIndex;
          const favs = (user?.favoriteLocations || []).map(c => c.toLowerCase().trim());
          const isFav = favs.includes(w.location.name.toLowerCase());

          return (
            <div key={idx} className={`weather-card ${isActive ? 'active-card' : ''}`}>
              <h3>{w.location.name}</h3>
              <img src={w.current.condition.icon} alt="" />
              <p><strong>{w.current.temp_c}°C</strong></p>
              <p className="description">{w.current.condition.text}</p>
              <p>💧 Nem: {w.current.humidity}%</p>
              <p>🍃 Rüzgar: {w.current.wind_kph} km/h</p>

              <div className="card-buttons">
                <button onClick={() => onCommentCard(w.location.name)}>
                  <FaRegCommentDots /> Yorum Yap
                </button>
                <button onClick={() => onDeleteCard(idx)}>
                  <FaTrash /> Sil
                </button>
              </div>

              {user && (
                <button onClick={() => {
                  console.log("favori butonuna basildi");
                  onToggleFavoriteCard(w.location.name);
                }}>
                  <FaStar /> {isFav ? '❌ Favorilerden Çıkar' : '⭐ Favorilere Ekle'}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={goNext} disabled={activeIndex === total - 1} className="carousel-btn">→</button>
    </div>
  );
}

export default WeatherCarousel;