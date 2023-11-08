import axios from 'axios';

const URL =
  import.meta.env.NODE_ENV === 'development'
    ? `${import.meta.env.VITE_MYLOCALHOST}:3000/api`
    : `https://api-curso-project.vercel.app/api`;

export default axios.create({
  baseURL: URL,
});
