import React, { useEffect, useState } from "react";

import classes from "./RecipeList.module.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { getAllRecipes, Recipe } from "../../api/recipe";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>();

  const fetchRecipes = async () => {
    try {
      const result = await getAllRecipes();
      setRecipes(result);
    } catch {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className={classes.container}>
      {recipes &&
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={{
              _id: recipe._id,
              title: recipe.title,
              description: recipe.description,
              ingredients: recipe.ingredients,
              imgName: recipe.imgName,
            }}
            reload={fetchRecipes}
          />
        ))}
    </div>
  );
};

export default RecipeList;
