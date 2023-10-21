import axios, { AxiosResponse } from "axios";
import apiConfig from "./apiConfig";
import PageResult from "./models/pageResult";
import Starship from "./models/starship";

export const getAllStarshipsByPage = async (page: number, search: string) => {
  try {
    const response: AxiosResponse<PageResult<Starship>> = await axios.get(
      `${apiConfig.starshipsURL}/all?page=${page}
      ${search != "" ? `&search=${search}` : ""}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getStarshipById = async (id: number) => {
  try {
    const response: AxiosResponse<Starship> = await axios.get(
      `${apiConfig.starshipsURL}/${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getStarshipsByOwnerId = async (ownerId: number) => {
  try {
    const response: AxiosResponse<Starship[]> = await axios.get(
      `${apiConfig.starshipsURL}/owned/${ownerId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
