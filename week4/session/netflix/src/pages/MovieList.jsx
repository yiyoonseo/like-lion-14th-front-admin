import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import Modal from '../components/Modal';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import useRecentShows from '../hooks/useRecentShows';

const MovieList = () => {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const { addShow } = useRecentShows();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get('https://api.tvmaze.com/shows', { signal: controller.signal })
      .then((res) => setShows(res.data))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (!trimmedQuery) {
      setSearchResults([]);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      axios
        .get(`https://api.tvmaze.com/search/shows?q=${trimmedQuery}`, { signal: controller.signal })
        .then((res) => setSearchResults(res.data.map((item) => item.show)))
        .catch(() => {});
    }, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmedQuery]);

  const featured = useMemo(() => shows.slice(0, 4), [shows]);
  const grid = useMemo(() => shows.slice(4, 20), [shows]);

  const handleCardClick = (show) => {
    addShow(show);
    setSelectedShow(show);
  };

  return (
    <main className="p-10 space-y-10">
      <SearchBar value={query} onChange={setQuery} />

      {trimmedQuery ? (
        <section>
          <h2 className="text-white text-xl font-bold mb-4">
            검색 결과 &quot;{trimmedQuery}&quot;
          </h2>
          {searchResults.length === 0 ? (
            <p className="text-gray-400">결과가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {searchResults.map((show) => (
                <div key={show.id} onClick={() => handleCardClick(show)} className="cursor-pointer">
                  <MovieCard show={show} />
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <section>
            <h2 className="text-white text-xl font-bold mb-4">Featured</h2>
            <div className="flex gap-6 overflow-x-auto no-scrollbar">
              {featured.map((show) => (
                <div key={show.id} className="w-60 flex-shrink-0 cursor-pointer" onClick={() => handleCardClick(show)}>
                  <MovieCard show={show} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold mb-4">All Shows</h2>
            <div className="grid grid-cols-6 gap-4">
              {grid.map((show) => (
                <div key={show.id} className="cursor-pointer" onClick={() => handleCardClick(show)}>
                  <MovieCard show={show} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <Modal show={selectedShow} onClose={() => setSelectedShow(null)} />
    </main>
  );
};

export default MovieList;
