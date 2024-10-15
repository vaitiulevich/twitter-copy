// // api/axios.ts

// import { store } from '@store/store'; // Импортируйте ваш store
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://your-api-url.com', // Замените на ваш API URL
// });

// // Добавляем интерсептор для запросов
// api.interceptors.request.use((config) => {
//   const state = store.getState();
//   const token = state.token; // Получаем токен из Redux

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовки
//   }

//   return config;
// });

// export default api;
