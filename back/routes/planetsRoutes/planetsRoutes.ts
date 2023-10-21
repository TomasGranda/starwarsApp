import { Router } from "express";
import planetsService from "../../services/planetsService";

export const planetsRoutes = Router();

planetsRoutes.get("/all", async (req, res) => {
  const page = parseInt(req.query.page?.toString() || "1");
  const search = req.query.search?.toString() || "";

  if (isNaN(page)) {
    res.status(400).send("Page must be a number");
    return;
  }

  const response = await planetsService.getAllPlanetsByPage(page, search);

  if (response.isError)
    res.status(response.status || 500).send(response.message);
  else res.status(200).send(response.data);
});

planetsRoutes.get("/:id", async (req, res) => {
  const id: number = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send("Id must be a number");
    return;
  }

  const response = await planetsService.getPlanetsById(id);

  if (response.isError)
    res.status(response.status || 500).send(response.message);
  else res.status(200).send(response.data);
});
