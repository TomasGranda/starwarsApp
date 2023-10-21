import express, { Express, Request, Response } from "express";
import { charactersRoutes } from "./routes/charactersRoutes/charactersRoutes";
import { filmsRoutes } from "./routes/filmsRoutes/filmsRoutes";
import { starshipsRoutes } from "./routes/starshipsRoutes/starshipsRoutes";
import { planetsRoutes } from "./routes/planetsRoutes/planetsRoutes";
import cors from "cors";

export const app: Express = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

export const listeningApp = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use("/api/characters", charactersRoutes);
app.use("/api/films", filmsRoutes);
app.use("/api/starships", starshipsRoutes);
app.use("/api/planets", planetsRoutes);
