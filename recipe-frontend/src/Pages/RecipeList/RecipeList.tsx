import React, { useEffect, useState } from "react";

import classes from "./RecipeList.module.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { getAllRecipes, Recipe } from "../../api/recipe";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const result = await getAllRecipes();
      setRecipes(result);
    } catch {
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!recipes) {
    <div>There are no recipes</div>;
  }

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
