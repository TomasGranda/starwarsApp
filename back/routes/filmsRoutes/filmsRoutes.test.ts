import { app, listeningApp } from "../..";
import request from "supertest";
import getFilmByIdMock from "./mocks/getFilmByIdMock.json";
import getAllFilmsMock from "./mocks/getAllFilmsMock.json";
import ApiResponse from "../../services/ApiResponse";

jest.mock("../../services/filmsService", () => ({
  getFilmById: jest.fn(() => {
    const apiResponse = new ApiResponse();
    apiResponse.isError = false;
    apiResponse.data = JSON.stringify(getFilmByIdMock);
    return apiResponse;
  }),
  getAllFilms: jest.fn(() => {
    const apiResponse = new ApiResponse();
    apiResponse.isError = false;
    apiResponse.data = JSON.stringify(getAllFilmsMock);
    return apiResponse;
  }),
}));

afterAll(
  jest.fn(() => {
    listeningApp.close();
  })
);

describe("films/:id tests", () => {
  test("Valid ID Should response 200 and getFilmByIdMock", async () => {
    const res = await request(app).get("/films/1");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getFilmByIdMock));
  });

  test("Invalid ID Should response 400 and error message", async () => {
    // Here i use example as an invalid id but it could be any other non number string
    const res = await request(app).get("/films/example");

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Id must be a number");
  });
});

describe("films/all tests", () => {
  test("Should response 200 and getAllFilmsMock", async () => {
    const res = await request(app).get("/films/all");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getAllFilmsMock));
  });
});
