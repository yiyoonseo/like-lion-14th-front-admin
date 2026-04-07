import { useState } from 'react';
import Modal from '../components/Modal';
import MovieCard from '../components/MovieCard';
import useRecentShows from '../hooks/useRecentShows';

const MyPage = () => {
  const { recentShows, removeShow } = useRecentShows();
  const [selectedShow, setSelectedShow] = useState(null);

  return (
    <main className="p-10 space-y-6">
      <h1 className="text-white text-2xl font-bold">마이페이지</h1>

      <section>
        <h2 className="text-white text-xl font-bold mb-4">최근 본 콘텐츠</h2>
        {recentShows.length === 0 ? (
          <p className="text-gray-400">최근 본 콘텐츠가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {recentShows.map((show) => (
              <div
                key={show.id}
                className="relative group cursor-pointer"
                onClick={() => setSelectedShow(show)}
              >
                <MovieCard show={show} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeShow(show.id);
                  }}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs rounded-full w-6 h-6 items-center justify-center hidden group-hover:flex"
                >
                  ✕
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
