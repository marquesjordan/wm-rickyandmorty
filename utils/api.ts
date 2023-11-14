import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchData = async (endpoint: string, id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}/?page=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchMultiData = async (endpoint: string, data: number[]) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}/${data}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
