import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connect, connection } from "mongoose";

import recipeRouter from "./routes/recipe";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors());

const uri = process.env.ATLAS_URI;
connect(uri);

connection.once("open", () => {
  console.log("MongodDB connection established successfully");
});

app.get("/", function (req: Request, res: Response) {
  res.send(`Backend server is runnning on ${port}  `);
});

app.use("/recipe", recipeRouter);

app.listen(port, function () {
  console.log(`starting app on: ${port}`);
});
