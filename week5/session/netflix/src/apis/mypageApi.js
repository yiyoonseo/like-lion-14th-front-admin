import { privateInstance } from './authApi';

export const getContents = async () => {
  const { data } = await privateInstance.get('/api/contents');
  return data.map((item) => ({
    id: item.tvMazeId,
    name: item.name,
    image: { medium: item.imageUrl },
    genres: item.genres ?? [],
    premiered: item.premiered ?? '',
  }));
};

export const postContent = async (show) => {
  const token = localStorage.getItem('accessToken');

  const payload = {
    id: show.id,
    name: show.name,
    image: {
      medium: show.image?.medium,
    },
  };

  const { data } = await privateInstance.post('/api/contents', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};