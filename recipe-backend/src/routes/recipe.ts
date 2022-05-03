import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

import Recipe from "../models/recipe";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.find();
    res.json(result);
  } catch {
    res.status(400).send("something went wrong");
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.findOne({ _id: req.params.id });
    res.json(result);
  } catch {
    res.status(400).send("something went wrong");
  }
};

const getImage = async (req: Request, res: Response) => {
  try {
    const imgName = req.params.imgName;
    let imgPath;
    if (imgName === "default") {
      imgPath = path.join(
        __dirname,
        `../../uploads/738bb0c5a5c01234028ec7105d1ceff3`
      );
    } else {
      imgPath = path.join(__dirname, `../../uploads/${imgName}`);
    }

    res.sendFile(imgPath);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const img = req.file;
    const recipe = {
      ...JSON.parse(req.body.data),
      imgName: img ? img.filename : null,
    };
    const newRecipe = new Recipe(recipe);
    const result = await newRecipe.save();
    res.json(result);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const recipe = {
      ...JSON.parse(req.body.data),
    };
    const img = req.file;
    if (img) {
      recipe.imgName = img.filename;
    }
    const result = await Recipe.updateOne(
      { _id: req.params.id },
      {
        $set: recipe,
      }
    );
    res.json(result);
  } catch {
    res.status(400).send("something went wrong");
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch {
    res.status(400).send("something went wrong");
  }
};

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/image/:imgName", getImage);
router.post("/", upload.single("image"), create);
router.put("/:id", upload.single("image"), update);
router.delete("/:id", remove);

export default router;
