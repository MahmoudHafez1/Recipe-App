import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import classes from "./RecipeCard.module.css";
import { getRecipeImage, deleteRecipe, Recipe } from "../../api/recipe";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface IRecipe {
  recipe: Recipe;
  reload: () => void;
}

const RecipeCard = ({ recipe, reload }: IRecipe) => {
  const [recipeImg, setRecipeImg] = useState<string>();
  const [showAction, setShowAction] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchRecipeImg = async () => {
    try {
      setLoading(true);
      const result = await getRecipeImage(
        recipe.imgName ? recipe.imgName : "default"
      );
      setRecipeImg(result);
    } catch {
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeImg();
  }, []);

  const deleteHandler = async () => {
    try {
      await deleteRecipe(recipe._id);
      alert("deleted successfully");
      reload();
    } catch {
      alert("something went wrong");
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div
      className={classes.container}
      onMouseOver={() => setShowAction(true)}
      onMouseLeave={() => {
        setShowAction(false);
        setShowActionMenu(false);
      }}
      onClick={() => navigate(recipe._id)}
    >
      <div className={classes.imgCont}>
        <img src={recipeImg} />
      </div>

      <div className={classes.infoCont}>{recipe.title}</div>
      {showAction && (
        <div
          className={classes.actionCont}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={classes.actionToggle}
            onClick={() => setShowActionMenu((state) => !state)}
          >
            ...
          </div>
          {showActionMenu && (
            <Button variant="contained" color="warning" onClick={deleteHandler}>
              delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
