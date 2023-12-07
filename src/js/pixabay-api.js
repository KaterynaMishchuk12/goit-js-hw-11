import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '41101875-48e4e18d626284da52e103f42';

export async function fetchPhoto(q, page, perPage) {
  const url = `${BASE_URL}/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  return response.data;
}

