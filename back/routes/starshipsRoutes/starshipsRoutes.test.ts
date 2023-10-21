import { app, listeningApp } from "../..";
import request from "supertest";
import getAllStarshipsByPageMock from "./mocks/getAllStarshipsByPageMock.json";
import getStarshipByIdMock from "./mocks/getStarshipByIdMock.json";
import ApiResponse from "../../services/ApiResponse";

jest.mock("../../services/starshipsService", () => ({
  getStarshipsById: jest.fn(() => {
    const apiResponse = new ApiResponse();
    apiResponse.isError = false;
    apiResponse.data = JSON.stringify(getStarshipByIdMock);
    return apiResponse;
  }),
  getAllStarshipsByPage: jest.fn(() => {
    const apiResponse = new ApiResponse();
    apiResponse.isError = false;
    apiResponse.data = JSON.stringify(getAllStarshipsByPageMock);
    return apiResponse;
  }),
}));

afterAll(
  jest.fn(() => {
    listeningApp.close();
  })
);

describe("starships/:id tests", () => {
  test("Valid ID Should response 200 and getStarshipByIdMock", async () => {
    const res = await request(app).get("/starships/1");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getStarshipByIdMock));
  });

  test("Invalid ID Should response 400 and error message", async () => {
    // Here i use example as an invalid id but it could be any other non number string
    const res = await request(app).get("/starships/example");

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Id must be a number");
  });
});

describe("starships/all tests", () => {
  test("No Page Should response 200 and getAllStarshipsByPageMock", async () => {
    const res = await request(app).get("/starships/all");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getAllStarshipsByPageMock));
  });

  test("Valid Page Should response 200 and getAllStarshipsByPageMock", async () => {
    const res = await request(app).get("/starships/all?page=4");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getAllStarshipsByPageMock));
  });

  test("Invalid Page Should response 400 and error message", async () => {
    // Here i use example as an invalid id but it could be any other non number string
    const res = await request(app).get("/starships/all?page=example");

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Page must be a number");
  });
});
