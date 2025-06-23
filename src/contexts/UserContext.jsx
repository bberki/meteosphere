import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const toggleFavorite = (city) => {
    // opsiyonel: context üzerinden de favori ekleme/kaldırma
    setUser(u => {
      if (!u) return u;
      const has = u.favoriteLocations.includes(city);
      const favs = has
        ? u.favoriteLocations.filter(c => c !== city)
        : [...u.favoriteLocations, city];
      return { ...u, favoriteLocations: favs };
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, toggleFavorite }}>
      {children}
    </UserContext.Provider>
  );
}