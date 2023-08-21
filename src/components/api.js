import axios from "axios";


export const fetchImages = async (query, page) => {
    const response = await axios.get('https://pixabay.com/api/', {
        method: 'get',
        params: {
          key: '38045322-2f369602cee0bc2677197c244',
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 12,
          page: page,
        },
      });
    return response.data.hits
}
