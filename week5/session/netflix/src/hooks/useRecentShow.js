
import { useState, useEffect } from 'react';
import { getContents, postContent } from '../apis/mypageApi';

const useRecentShows = () => {
  const [recentShows, setRecentShows] = useState([]);

  useEffect(() => {
    getContents()
      .then((data) => setRecentShows(data))
      .catch((err) => console.error(err));
  }, []);

  const addShow = async (show) => {
    const isDuplicate = recentShows.some((s) => s.id === show.id);
    if (isDuplicate) return;

    try {
      const saved = await postContent(show);
      setRecentShows((prev) => [saved, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const removeShow = (id) => {
    setRecentShows((prev) => prev.filter((s) => s.id !== id));
    // 필요시 DELETE /api/content/:id 추가
  };

  return { recentShows, addShow, removeShow };
};

export default useRecentShows;
