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
    throw new Error("cannot get recipe list");
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.findOne({ _id: req.params.id });
    res.json(result);
  } catch {
    throw new Error("cannot get current recipe");
  }
};

const getImage = async (req: Request, res: Response) => {
  try {
    const imgName = req.params.imgName;
    let imgPath;
    if (imgName === "default") {
      imgPath = path.join(
        __dirname,
        `../../uploads/3b357f65b4c3c8cc11a0c124cc7f4be7`
      );
    } else {
      imgPath = path.join(__dirname, `../../uploads/${imgName}`);
    }

    res.sendFile(imgPath);
  } catch (err) {
    throw new Error("cannot get image");
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
    throw new Error("cannot create new Recipe");
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.json(result);
  } catch {
    throw new Error("cannot get current recipe");
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch {
    throw new Error("cannot delete current recipe");
  }
};

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/image/:imgName", getImage);
router.post("/", upload.single("image"), create);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
