import axios from "axios";
import starwarsApiConfig from "../starwarsApiConfig";
import ApiResponse from "./ApiResponse";

const getPlanetsById = async (id: number) => {
  try {
    const response = await axios.get(`${starwarsApiConfig.planetsURL}/${id}`);
    return ApiResponse.fromAxiosResponse(response);
  } catch (error) {
    console.error("An error occurs.", error);
    if (axios.isAxiosError(error)) return ApiResponse.fromAxiosError(error);
    else return ApiResponse.ErrorResponse();
  }
};

const getAllPlanetsByPage = async (page: number, search: string) => {
  try {
    const response = await axios.get(
      `${starwarsApiConfig.planetsURL}?page=${page}
      ${search != "" ? `&search=${search}` : ""}`
    );
    return ApiResponse.fromAxiosResponse(response);
  } catch (error) {
    console.error("An error occurs.", error);
    if (axios.isAxiosError(error)) return ApiResponse.fromAxiosError(error);
    else return ApiResponse.ErrorResponse();
  }
};

export default {
  getPlanetsById,
  getAllPlanetsByPage,
};
