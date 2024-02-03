import axios from 'axios';

const API_KEY = '41689028-c746e1e6e71d95932f933e2cb';
const BASE_URL = 'https://pixabay.com/api/';
async function serviceGetQuestion(question, counter) {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${question}&image_type=photo&orientation=horizontal&safesearch=true&page=${counter}&per_page=40`
  );
  const data = response.data.hits;
  return response.data;
}
export { serviceGetQuestion };
