import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();
const port = 5000;

app.use(bodyParser.json());

app.use(cors());

app.get("/", function (req: Request, res: Response) {
  res.send(`Backend server is runnning on ${port}  `);
});

app.listen(port, function () {
  console.log(`starting app on: ${port}`);
});
