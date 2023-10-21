import axios, { AxiosResponse } from "axios";
import apiConfig from "./apiConfig";
import PageResult from "./models/pageResult";
import Film from "./models/film";

export const getAllFilms = async () => {
  try {
    const response: AxiosResponse<PageResult<Film>> = await axios.get(
      `${apiConfig.filmsURL}/all`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getFilmById = async (id: number) => {
  try {
    const response: AxiosResponse<Film> = await axios.get(
      `${apiConfig.filmsURL}/${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getFilmsByOwnerId = async (ownerId: number) => {
  try {
    const response: AxiosResponse<Film[]> = await axios.get(
      `${apiConfig.filmsURL}/owned/${ownerId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};