import { Router } from "express";
import filmsService from "../../services/filmsService";
import charactersService from "../../services/charactersService";
import Character from "../../models/character";
import { getIdFromPath } from "../../utils";

export const filmsRoutes = Router();

filmsRoutes.get("/all", async (req, res) => {
  const response = await filmsService.getAllFilms();

  if (response.isError)
    res.status(response.status || 500).send(response.message);
  else res.status(200).send(response.data);
});

filmsRoutes.get("/:id", async (req, res) => {
  const id: number = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send("Id must be a number");
    return;
  }

  const response = await filmsService.getFilmById(id);

  if (response.isError)
    res.status(response.status || 500).send(response.message);
  else res.status(200).send(response.data);
});

filmsRoutes.get("/owned/:ownerId", async (req, res) => {
  const id: number = parseInt(req.params.ownerId);

  if (isNaN(id)) {
    res.status(400).send("Id must be a number");
    return;
  }

  const characterResponse = await charactersService.getCharacterById(id);
  if (characterResponse.isError) {
    res.status(characterResponse.status || 500).send(characterResponse.message);
    return;
  }

  const character: Character = characterResponse.data as Character;
  const filmList: string[] = [];

  for (let starship of character.films) {
    const response = await filmsService.getFilmById(
      parseInt(getIdFromPath(new URL(starship)) || "")
    );

    filmList.push(response.data || "");
  }

  res.status(200).send(filmList);
});