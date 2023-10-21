import axios, { AxiosResponse } from "axios";
import apiConfig from "./apiConfig";
import PageResult from "./models/pageResult";
import Planet from "./models/planet";

export const getAllPlanetsByPage = async (page: number, search: string) => {
  try {
    const response: AxiosResponse<PageResult<Planet>> = await axios.get(
      `${apiConfig.planetsURL}/all?page=${page}
      ${search != "" ? `&search=${search}` : ""}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPlanetById = async (id: number) => {
  try {
    const response: AxiosResponse<Planet> = await axios.get(
      `${apiConfig.planetsURL}/${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
