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