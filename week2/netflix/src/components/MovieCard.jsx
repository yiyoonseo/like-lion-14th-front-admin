import React from 'react';

const MovieCard = ({ movie }) => {
  // props로 받은 movie 객체에서 필요한 정보를 구조 분해 할당합니다.
  const { movieImage, releaseDate, artist, title, director, description } = movie;

  return (
    <section className="w-100 bg-gray-800 p-6 rounded-lg shadow">
      <img
        src={movieImage}
        alt={`${title} 영화 포스터`}
        className="w-full rounded mb-4"
      />
      <h2 className="text-2xl font-semibold">{title}</h2>
      <hr className="my-4 border-gray-600" />
      <div className="space-y-2">
        <p className="text-gray-200">🎭 주연배우: {artist}</p>
        <p className="text-gray-200">🎬 감독: {director}</p>
        <p className="text-gray-200">📝 설명: {description}</p>
        <p className="text-gray-400 text-sm mt-2">📅 개봉일: {releaseDate}</p>
      </div>
    </section>
  );
};

export default MovieCard;