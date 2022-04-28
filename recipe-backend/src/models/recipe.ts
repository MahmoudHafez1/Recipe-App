import { Schema, model } from "mongoose";

const IngredientShema = new Schema(
  {
    name: String,
    unit: String,
    amount: Number,
  },
  { _id: false }
);

const RecipeShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  img_path: String,
  ingredients: [IngredientShema],
});

export default model("Recipe", RecipeShema);
