import express, { Request, Response } from "express";

import Recipe from "../models/recipe";

const router = express.Router();

const index = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.find();
    res.json(result);
  } catch {
    throw new Error("cannot get recipe list");
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newRecipe = new Recipe(req.body);
    const result = await newRecipe.save();
    res.json(result);
  } catch {
    throw new Error("cannot create new recipe");
  }
};

const current = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.findOne({ _id: req.params.id });
    res.json(result);
  } catch {
    throw new Error("cannot get current recipe");
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

router.route("/").get(index);
router.route("/:id").get(current);
router.route("/").post(create);
router.route("/:id").patch(update);
router.route("/:id").delete(remove);

export default router;
