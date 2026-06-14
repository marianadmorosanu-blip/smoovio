import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'smovioo_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  }, []);

  const isFavorite = useCallback(
    (recipeId: string) => favorites.includes(recipeId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
