import React, { useEffect, useState } from 'react';
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
  const [visibleCount, setVisibleCount] = useState(window.innerWidth < 768 ? 1 : 3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = weatherList.length;
  const offset = Math.floor(visibleCount / 2);

  const start = Math.min(
    Math.max(activeIndex - offset, 0),
    Math.max(total - visibleCount, 0)
  );

  const visible = weatherList.slice(start, start + visibleCount);

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
              <p>💧 Humidity: {w.current.humidity}%</p>
              <p>🍃 Wind: {w.current.wind_kph} km/h</p>

              <div className="card-buttons">
                <button onClick={() => onCommentCard(w.location.name)}>
                  <FaRegCommentDots /> Comment
                </button>
                <button onClick={() => onDeleteCard(idx)}>
                  <FaTrash /> Delete
                </button>
                {user && (
                <button onClick={() => onToggleFavoriteCard(w.location.name)}>
                  <FaStar /> {isFav ? 'Pinned' : 'Pin'}
                </button>
              )}
              </div>

              
            </div>
          );
        })}
      </div>
      <button onClick={goNext} disabled={activeIndex === total - 1} className="carousel-btn">→</button>
    </div>
  );
}

export default WeatherCarousel;