{/*
import movieData from '../data/movie.json';

const MovieList = () => {
  const { movieImage, releaseDate, artist, title, director, description } =
    movieData;

  return (
    <main className="p-10">
      <section className="w-100 bg-gray-800 p-6 rounded-lg shadow">
        <img
          src={movieImage}
          alt={`${title} 영화 포스터`}
          className="w-full rounded mb-4"
        />
        <h2 className="text-2xl font-semibold">{title}</h2>
        <hr className="my-4" />
        <p className="text-gray-200">🎭 주연배우: {artist}</p>
        <p className="text-gray-200">🎬 감독: {director}</p>
        <p className="text-gray-200">📝 설명: {description}</p>
        <p className="text-gray-400 text-sm mt-2">📅 개봉일: {releaseDate}</p>
      </section>
    </main>
  );
}

export default MovieList
*/}

import React from 'react';
import movieData from '../data/movie.json';
import MovieCard from '../components/MovieCard';

const MovieList = () => {
  return (
    <main className="gap-5 p-10">
      {/* 현재는 movie.json이 단일 객체라면 아래와 같이 전달하고, 
        만약 배열이라면 movieData.map(movie => <MovieCard key={movie.id} movie={movie} />) 형태로 쓸 수 있습니다.
      */}
      {/* 가로 스크롤 컨테이너 */}
      <div className="flex gap-6 overflow-x-auto">
        {movieData.map((movie) => (
          // 카드가 줄어들지 않도록 flex-shrink-0을 주고, 너비를 고정합니다.
          <div key={movie.movieId} >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default MovieList;