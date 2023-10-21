import axios from "axios";
import starwarsApiConfig from "../starwarsApiConfig";
import ApiResponse from "./ApiResponse";

const getStarshipsById = async (id: number) => {
  try {
    const response = await axios.get(`${starwarsApiConfig.starshipsURL}/${id}`);
    return ApiResponse.fromAxiosResponse(response);
  } catch (error) {
    console.error("An error occurs.", error);
    if (axios.isAxiosError(error)) return ApiResponse.fromAxiosError(error);
    else return ApiResponse.ErrorResponse();
  }
};

const getAllStarshipsByPage = async (page: number, search: string) => {
  try {
    const response = await axios.get(
      `${starwarsApiConfig.starshipsURL}?page=${page}
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
  getStarshipsById,
  getAllStarshipsByPage,
};
