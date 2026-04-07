import { X, Star, Calendar, Tv } from 'lucide-react';

const Modal = ({ show, onClose }) => {
  if (!show) return null;

  // TV Maze summary는 HTML 태그 포함 → 태그 제거
  const summary = show.summary?.replace(/<[^>]+>/g, '') ?? '설명이 없습니다.';

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 포스터 */}
        <img
          src={
            show.image?.original ??
            show.image?.medium ??
            'https://via.placeholder.com/400x600?text=No+Image'
          }
          alt={show.name}
          className="w-full p-2 rounded-xl md:w-64 object-cover flex-shrink-0"
        />

        {/* 정보 */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto">
          {/* 헤더 */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-white text-2xl font-bold leading-tight">
              {show.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white flex-shrink-0"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>
          </div>

          {/* 뱃지 */}
          <div className="flex flex-wrap gap-2">
            {show.genres?.map((g) => (
              <span
                key={g}
                className="bg-red-600 text-white text-xs px-2 py-1 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>

          {/* 메타 정보 */}
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            {show.rating?.average && (
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{show.rating.average} / 10</span>
              </div>
            )}
            {show.premiered && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{show.premiered}</span>
              </div>
            )}
            {show.network?.name && (
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-gray-400" />
                <span>{show.network.name}</span>
              </div>
            )}
            {show.status && (
              <span
                className={`w-fit text-xs px-2 py-1 rounded-full font-semibold ${
                  show.status === 'Running'
                    ? 'bg-green-700 text-green-100'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {show.status}
              </span>
            )}
          </div>

          {/* 줄거리 */}
          <p className="text-gray-400 text-sm leading-relaxed">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
