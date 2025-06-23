import React, { useState, useEffect } from 'react';
import { FaTrash, FaRegCommentDots, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
    <div className="carousel-wrapper relative flex justify-center items-center mt-6">
      <button
        onClick={goPrev}
        disabled={activeIndex === 0}
        className="carousel-btn prev absolute left-0 top-1/2 -translate-y-1/2"
      >
        <FaChevronLeft />
      </button>
      <div className="carousel-cards flex flex-wrap justify-center gap-4">
        {visible.map((w, i) => {
          const idx = start + i;
          const isActive = idx === activeIndex;
          const favs = (user?.favoriteLocations || []).map(c => c.toLowerCase().trim());
          const isFav = favs.includes(w.location.name.toLowerCase());

          return (
            <div
              key={idx}
              className={`weather-card ${isActive ? 'active-card' : ''} w-[80vw] md:w-[45vw] lg:w-[240px]`}
            >
              <h3>{w.location.name}</h3>
              <img src={w.current.condition.icon} alt="" className="mx-auto" />
              <p><strong>{w.current.temp_c}°C</strong></p>
              <p className="description">{w.current.condition.text}</p>
              <p className="info-row">
                <span role="img" aria-label="Nem">💧</span>
                <span>Nem: {w.current.humidity}%</span>
              </p>
              <p className="info-row">
                <span role="img" aria-label="Rüzgar">🍃</span>
                <span>Rüzgar: {w.current.wind_kph} km/h</span>
              </p>

              <div className="card-buttons">
                <button onClick={() => onCommentCard(w.location.name)}>
                  <span role="img" aria-label="Yorum">💬</span> Yorum Yap
                </button>
                <button onClick={() => onDeleteCard(idx)}>
                  <span role="img" aria-label="Sil">🗑️</span> Sil
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
      <button
        onClick={goNext}
        disabled={activeIndex === total - 1}
        className="carousel-btn next absolute right-0 top-1/2 -translate-y-1/2"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default WeatherCarousel;