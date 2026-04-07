import { useState } from 'react';

const KEY = 'recentShows';

const useRecentShows = () => {
  const [recentShows, setRecentShows] = useState(() =>
    JSON.parse(localStorage.getItem(KEY) ?? '[]')
  );

  const addShow = (show) => {
    setRecentShows((prev) => {
      const next = [show, ...prev.filter((s) => s.id !== show.id)].slice(0, 10);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const removeShow = (id) => {
    setRecentShows((prev) => {
      const next = prev.filter((s) => s.id !== id);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  return { recentShows, addShow, removeShow };
};

export default useRecentShows;
