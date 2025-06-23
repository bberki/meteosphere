import { useState, useEffect } from "react";
import { fetchWeatherByCity, fetchCitySuggestions } from "../services/weatherAPI";

function SearchBar({ onWeatherFetched }) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length < 2) {
        setSuggestions([]);
        return;
      }

      const result = await fetchCitySuggestions(city);
      if (result) setSuggestions(result);
    };

    fetchSuggestions();
  }, [city]);

  const handleSelectSuggestion = async (suggestion) => {
    const data = await fetchWeatherByCity(suggestion);
    if (data) {
      onWeatherFetched(data);
      setCity('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    const data = await fetchWeatherByCity(city);
    if (data) {
      onWeatherFetched(data);
      setCity('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar">
      <div className="autocomplete-wrapper">
        <input
          type="text"
          placeholder="Şehir adı girin"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setShowSuggestions(true);
          }}
          className="search-input"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((item) => (
              <li
                key={item.id || item.name}
                onClick={() => handleSelectSuggestion(item.name)}
              >
                {item.name}, {item.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleSearch} className="search-button">
        Ara
      </button>
    </div>
  );
}

export default SearchBar;