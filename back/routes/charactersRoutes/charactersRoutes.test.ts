import { app, listeningApp } from "../..";
import request from "supertest";
import getCharacterByIdMock from "./mocks/getCharacterByIdMock.json";
import getAllCharactersByPageMock from "./mocks/getAllCharactersByPageMock.json";
import ApiResponse from "../../services/ApiResponse";

jest.mock("../../services/charactersService", () => ({
  getCharacterById: jest.fn(() => {
    const apiResponse = new ApiResponse();
    apiResponse.isError = false;
    apiResponse.data = JSON.stringify(getCharacterByIdMock);
    return apiResponse;
  }),
  getAllCharactersByPage: jest.fn(() => {
    const apiResponse = new ApiResponse();
    apiResponse.isError = false;
    apiResponse.data = JSON.stringify(getAllCharactersByPageMock);
    return apiResponse;
  }),
}));

afterAll(
  jest.fn(() => {
    listeningApp.close();
  })
);

describe("character/:id tests", () => {
  test("Valid ID Should response 200 and getCharacterByIdMock", async () => {
    const res = await request(app).get("/characters/1");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getCharacterByIdMock));
  });

  test("Invalid ID Should response 400 and error message", async () => {
    // Here i use example as an invalid id but it could be any other non number string
    const res = await request(app).get("/characters/example");

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Id must be a number");
  });
});

describe("character/all tests", () => {
  test("No Page Should response 200 and getAllCharactersByPageMock", async () => {
    const res = await request(app).get("/characters/all");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getAllCharactersByPageMock));
  });

  test("Valid Page Should response 200 and getAllCharactersByPageMock", async () => {
    const res = await request(app).get("/characters/all?page=4");

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(JSON.stringify(getAllCharactersByPageMock));
  });

  test("Invalid Page Should response 400 and error message", async () => {
    // Here i use example as an invalid id but it could be any other non number string
    const res = await request(app).get("/characters/all?page=example");

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Page must be a number");
  });
});
