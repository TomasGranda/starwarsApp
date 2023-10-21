import { Router } from "express";
import starshipsService from "../../services/starshipsService";
import charactersService from "../../services/charactersService";
import { getIdFromPath } from "../../utils";
import Character from "../../models/character";

export const starshipsRoutes = Router();

starshipsRoutes.get("/all", async (req, res) => {
  const page = parseInt(req.query.page?.toString() || "1");
  const search = req.query.search?.toString() || "";

  if (isNaN(page)) {
    res.status(400).send("Page must be a number");
    return;
  }

  const response = await starshipsService.getAllStarshipsByPage(page, search);

  if (response.isError)
    res.status(response.status || 500).send(response.message);
  else res.status(200).send(response.data);
});

starshipsRoutes.get("/:id", async (req, res) => {
  const id: number = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send("Id must be a number");
    return;
  }

  const response = await starshipsService.getStarshipsById(id);

  if (response.isError)
    res.status(response.status || 500).send(response.message);
  else res.status(200).send(response.data);
});

starshipsRoutes.get("/owned/:ownerId", async (req, res) => {
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
  const starshipsList: string[] = [];

  for (let starship of character.starships) {
    const response = await starshipsService.getStarshipsById(
      parseInt(getIdFromPath(new URL(starship)) || "")
    );

    starshipsList.push(response.data || "");
  }

  res.status(200).send(starshipsList);
});
