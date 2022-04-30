import axios from "axios";

const host = "http://localhost:5000";

export type Ingredient = {
  name?: string;
  unit?: string;
  amount?: number;
};

export type Recipe = {
  _id: string;
  title: string;
  description?: string;
  ingredients?: Ingredient[];
  imgName?: string;
};

export const getAllRecipes = async () => {
  try {
    const result = await axios.get(`${host}/recipe`);
    return result.data;
  } catch {
    throw new Error("cannot get Recipes");
  }
};

export const getRecipe = async (id: string) => {
  try {
    const result = await axios.get(`${host}/recipe/${id}`);
    return result.data;
  } catch {
    throw new Error("cannot get Recipe");
  }
};

export const createRecipe = async (formData: FormData) => {
  try {
    await axios.post(`${host}/recipe/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch {
    throw new Error("cannot create Recipe");
  }
};

export const getRecipeImage = async (imgName: string) => {
  try {
    const res = await fetch(`${host}/recipe/image/${imgName}`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
  } catch {
    throw new Error("cannot get recipe image");
  }
};

export const deleteRecipe = async (_id: string) => {
  try {
    await axios.delete(`${host}/recipe/${_id}`);
  } catch {
    throw new Error("cannot delete Recipe");
  }
};
