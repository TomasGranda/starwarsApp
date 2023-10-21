import axios, { AxiosResponse } from "axios";
import apiConfig from "./apiConfig";
import PageResult from "./models/pageResult";
import Character from "./models/character";

export const getAllCharactersByPage = async (page: number, search: string) => {
  try {
    const response: AxiosResponse<PageResult<Character>> = await axios.get(
      `${apiConfig.charactersURL}/all?page=${page}
      ${search != "" ? `&search=${search}` : ""}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const response: AxiosResponse<Character> = await axios.get(
      `${apiConfig.charactersURL}/${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
