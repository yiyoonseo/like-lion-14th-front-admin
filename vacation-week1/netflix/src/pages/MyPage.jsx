import { useState } from 'react';
import Modal from '../components/Modal';
import MovieCard from '../components/MovieCard';
import useRecentShows from '../hooks/useRecentShow';

const MyPage = () => {
  const { recentShows, removeShow } = useRecentShows();
  const [selectedShow, setSelectedShow] = useState(null);

  return (
    <main className="px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 space-y-6 md:space-y-7">
      <h1 className="text-white text-2xl font-bold">마이페이지</h1>

      <section>
        <h2>최근 본 콘텐츠</h2>
        {recentShows.length === 0 ? (
          <p> 최근 본 콘텐츠가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {recentShows.map((show) => (
              <div
                key={show.id}
                onClick={() => setSelectedShow(show)}
                className="relative group cursor-pointer"
              >
                <MovieCard show={show} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeShow(show.id);
                  }}
                  className="absolute top-2 right-2 text-white text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Modal show={selectedShow} onClose={() => setSelectedShow(null)} />
    </main>
  );
};

export default MyPage;
