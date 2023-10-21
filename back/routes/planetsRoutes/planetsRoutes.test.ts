import { app, listeningApp } from "../..";
import request from "supertest";
import getPlanetByIdMock from "./mocks/getPlanetByIdMock.json";
import getAllPlanetsByPageMock from "./mocks/getAllPlanetsByPageMock.json";
import ApiResponse from "../../services/ApiResponse";

jest.mock("../../services/planetsService", () => ({
  getPlanetsById: jest.fn(() => {
    const apiResponse = new ApiResponse();
    apiResponse.isError = false;
    apiResponse.data = JSON.stringify(getPlanetByIdMock);
    return apiResponse;
  }),
  getAllPlanetsByPage: jest.fn(() => {
    const apiResponse = new ApiResponse();
    apiResponse.isError = false;
    apiResponse.data = JSON.stringify(getAllPlanetsByPageMock);
    return apiResponse;
  }),
}));

afterAll(
  jest.fn(() => {
    listeningApp.close();
  })
);

describe("planets/:id tests", () => {
  test("Valid ID Should response 200 and getPlanetByIdMock", async () => {
    const res = await request(app).get("/planets/1");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getPlanetByIdMock));
  });

  test("Invalid ID Should response 400 and error message", async () => {
    // Here i use example as an invalid id but it could be any other non number string
    const res = await request(app).get("/planets/example");

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Id must be a number");
  });
});

describe("planets/all tests", () => {
  test("No Page Should response 200 and getAllPlanetsByPageMock", async () => {
    const res = await request(app).get("/planets/all");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getAllPlanetsByPageMock));
  });

  test("Valid Page Should response 200 and getAllPlanetsByPageMock", async () => {
    const res = await request(app).get("/planets/all?page=4");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getAllPlanetsByPageMock));
  });

  test("Invalid Page Should response 400 and error message", async () => {
    // Here i use example as an invalid id but it could be any other non number string
    const res = await request(app).get("/planets/all?page=example");

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Page must be a number");
  });
});
