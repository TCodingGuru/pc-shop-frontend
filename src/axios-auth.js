import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost/',
});

// Set Authorization header if token exists
const token = localStorage.getItem('token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
