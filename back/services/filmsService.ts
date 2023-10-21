import axios from "axios";
import starwarsApiConfig from "../starwarsApiConfig";
import ApiResponse from "./ApiResponse";

const getFilmById = async (id: number) => {
  try {
    const response = await axios.get(`${starwarsApiConfig.filmsURL}/${id}`);
    return ApiResponse.fromAxiosResponse(response);
  } catch (error) {
    console.error("An error occurs.", error);
    if (axios.isAxiosError(error)) return ApiResponse.fromAxiosError(error);
    else return ApiResponse.ErrorResponse();
  }
};

const getAllFilms = async () => {
  try {
    const response = await axios.get(starwarsApiConfig.filmsURL);
    return ApiResponse.fromAxiosResponse(response);
  } catch (error) {
    console.error("An error occurs.", error);
    if (axios.isAxiosError(error)) return ApiResponse.fromAxiosError(error);
    else return ApiResponse.ErrorResponse();
  }
};

export default {
  getFilmById,
  getAllFilms,
};
