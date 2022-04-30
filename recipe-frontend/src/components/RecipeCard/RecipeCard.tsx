import React, { useState, useEffect } from "react";

import classes from "./RecipeCard.module.css";
import { getRecipeImage, deleteRecipe, Recipe } from "../../api/recipe";

interface IRecipe {
  recipe: Recipe;
  reload: () => void;
}

const RecipeCard = ({ recipe, reload }: IRecipe) => {
  const [recipeImg, setRecipeImg] = useState<string>();
  const [showAction, setShowAction] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);

  const fetchRecipeImg = async () => {
    try {
      const result = await getRecipeImage(
        recipe.imgName ? recipe.imgName : "default"
      );
      setRecipeImg(result);
    } catch {
      alert("something went wrong");
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

  return (
    <div
      className={classes.container}
      onMouseOver={() => setShowAction(true)}
      onMouseLeave={() => {
        setShowAction(false);
        setShowActionMenu(false);
      }}
    >
      {recipeImg && (
        <div className={classes.imgCont}>
          <img src={recipeImg} />
        </div>
      )}
      <div className={classes.infoCont}>{recipe.title}</div>
      {showAction && (
        <div className={classes.actionCont}>
          <div
            className={classes.actionToggle}
            onClick={() => setShowActionMenu((state) => !state)}
          >
            ...
          </div>
          {showActionMenu && (
            <div className={classes.actionMenu} onClick={deleteHandler}>
              delete
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
