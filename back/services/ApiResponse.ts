import { AxiosError, AxiosResponse } from "axios";

export default class ApiResponse {
  message?: string;
  data?: any;
  status?: number;
  isError?: boolean;

  static fromAxiosResponse<T>(response: AxiosResponse<T>) {
    const newApiResponse = new ApiResponse();
    newApiResponse.message = "Ok";
    newApiResponse.isError = false;
    newApiResponse.status = response.status;
    newApiResponse.data = response.data;
    return newApiResponse;
  }

  static fromError(error: Error) {
    const newApiResponse = new ApiResponse();
    newApiResponse.message = error.message;
    newApiResponse.isError = true;
    newApiResponse.status = 500;
    return newApiResponse;
  }

  static fromAxiosError(error: AxiosError) {
    const newApiResponse = new ApiResponse();
    newApiResponse.message = error.message;
    newApiResponse.isError = true;
    newApiResponse.status = error.status;
    return newApiResponse;
  }

  static ErrorResponse() {
    const newApiResponse = new ApiResponse();
    newApiResponse.message = "An error occurs.";
    newApiResponse.isError = true;
    newApiResponse.status = 500;
    return newApiResponse;
  }
}
