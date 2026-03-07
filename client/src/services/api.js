import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const categorizeProduct = (data) => axios.post(`${API_URL}/products/categorize`, data);
export const sendChatMessage = (data) => axios.post(`${API_URL}/bot/chat`, data);