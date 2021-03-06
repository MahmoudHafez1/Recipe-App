import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RevolvingDot } from "react-loader-spinner";
import { Button } from "@mui/material";

import classes from "./RecipeDetails.module.css";
import {
  getRecipe,
  getRecipeImage,
  deleteRecipe,
  Recipe,
} from "../../api/recipe";
import IngredientTable from "../../components/IngredientTable/IngredientTable";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [recipeImg, setRecipeImg] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const result = await getRecipe(String(id));
      setRecipe(result);
      const image = await getRecipeImage(
        result.imgName ? result.imgName : "default"
      );
      setRecipeImg(image);
    } catch {
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const deleteHandler = async () => {
    try {
      await deleteRecipe(String(id));
      navigate(-1);
    } catch {
      alert("something went wrong");
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!recipe || !recipeImg) return <div>Recipe is not found</div>;
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>{recipe.title}</h1>
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/edit/${id}`)}
            style={{ marginRight: "1rem" }}
          >
            Edit
          </Button>
          <Button variant="contained" color="warning" onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.leftSection}>
          <div className={classes.imgCont}>
            <img src={recipeImg} />
          </div>
        </div>
        <div className={classes.rightSection}>
          {recipe.ingredients.length > 0 && (
            <>
              <label className={classes.sideLabel}>Ingredients</label>
              <div className={classes.ingredCont}>
                <IngredientTable ingredients={recipe.ingredients} />
              </div>
            </>
          )}
          {recipe.description && (
            <>
              <label className={classes.sideLabel}>Recipe description</label>
              <div className={classes.descrCont}>{recipe.description}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
