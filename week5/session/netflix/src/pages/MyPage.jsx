import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import MovieCard from '../components/MovieCard';
import { getContents } from '../apis/mypageApi';

const MyPage = () => {
  const [recentShows, setRecentShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    getContents()
      .then((data) => {
        console.log('GET 받아온 데이터:', data); // 데이터 확인용
        setRecentShows(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 space-y-6 md:space-y-7">
      <h1 className="text-white text-2xl font-bold">마이페이지</h1>

      <section>
        <h2>최근 본 콘텐츠</h2>
        {recentShows.length === 0 ? (
          <p>최근 본 콘텐츠가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {recentShows.map((show) => (
              <div
                key={show.id}
                onClick={() => setSelectedShow(show)}
                className="relative group cursor-pointer"
              >
                <MovieCard show={show} />
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
