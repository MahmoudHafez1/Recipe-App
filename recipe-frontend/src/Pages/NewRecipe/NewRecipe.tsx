import React, { useState, useEffect } from "react";
import { TextField, Button, InputLabel, TextareaAutosize } from "@mui/material";
import { useParams } from "react-router-dom";

import classes from "./NewRecipe.module.css";
import {
  createRecipe,
  Ingredient,
  getRecipe,
  updateRecipe,
} from "../../api/recipe";
import IngredientTable from "../../components/IngredientTable/IngredientTable";

const NewRecipe = () => {
  const [title, setTitle] = useState<string>();
  const [ingredients, setIngredients] = useState<Ingredient[]>();
  const [currentIngred, setCurrentIngred] = useState<Ingredient>();
  const [addIngBtn, setAddIngBtn] = useState(false);
  const [description, setDescription] = useState<string>();
  const [imgName, setImgName] = useState<string>();

  const imgRef = React.createRef<HTMLInputElement>();

  const { id } = useParams();

  const fetchRecipe = async () => {
    try {
      const recipe = await getRecipe(String(id));
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setDescription(recipe.description);
      setImgName(recipe.imgName);
    } catch {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const changeIngredHandler = (value: string, key: string) => {
    setCurrentIngred((ing) => {
      return {
        ...ing,
        [key]: value,
      };
    });
  };

  const addIngredHandler = () => {
    if (currentIngred) {
      const exist = ingredients?.find(
        (ing) => ing.name?.replaceAll(/ /g, "") === currentIngred.name
      );
      if (exist) {
        alert("Ingredient already exists");
      } else {
        setIngredients((ingList) => {
          if (ingList) {
            return [...ingList, currentIngred];
          } else {
            return [currentIngred];
          }
        });
      }
    }
  };

  const removeIngredHandler = (name: string) => {
    setIngredients((ingList) => ingList?.filter((ing) => ing.name !== name));
  };

  useEffect(() => {
    let enableAddIng = false;
    if (currentIngred?.name && currentIngred?.unit && currentIngred?.amount) {
      if (
        currentIngred.name.replaceAll(/ /g, "").length > 0 &&
        currentIngred.amount > 0
      )
        enableAddIng = true;
    }
    setAddIngBtn(enableAddIng);
  }, [currentIngred]);

  const submitHandler = async (e: any) => {
    try {
      e.preventDefault();
      const recipe = {
        title,
        ingredients,
        description,
      };
      const formData = new FormData();
      const files = imgRef?.current?.files;
      if (files && imgName) {
        formData.append("image", files[0]);
      }
      formData.append("data", JSON.stringify(recipe));
      if (id) {
        await updateRecipe(id, formData);
        alert("Recipe updated successfully");
      } else {
        await createRecipe(formData);
        alert("Recipe created successfully");
      }
    } catch {
      alert("something went wrong");
    }
  };
  return (
    <div className={classes.container}>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label className={classes.sideLabel}>Title</label>
            <TextField
              variant="outlined"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label className={classes.sideLabel}>Dish Image</label>
            <label className={classes.upload}>
              Upload
              <input
                id="file-upload"
                type="file"
                accept="image/jpeg, image/png"
                ref={imgRef}
                onChange={(e) => {
                  const splitArr = e.target.value.split("\\");
                  const name = splitArr[splitArr.length - 1];
                  setImgName(name);
                }}
              />
            </label>
            {imgName && (
              <label className={classes.imgName}>
                {imgName}
                <span
                  className={classes.remove}
                  onClick={() => setImgName(undefined)}
                >
                  remove
                </span>
              </label>
            )}
          </div>
        </div>

        <label className={classes.sideLabel}>Ingredients</label>
        <div className={classes.ingredientList}>
          {ingredients && (
            <IngredientTable
              ingredients={ingredients}
              edit
              removeHandler={removeIngredHandler}
            />
          )}
        </div>

        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <InputLabel>name</InputLabel>
            <TextField
              variant="outlined"
              type="text"
              value={currentIngred?.name}
              onChange={(e) => changeIngredHandler(e.target.value, "name")}
              style={{ width: "10rem" }}
            />
          </div>
          <div className={classes.inputGroup}>
            <InputLabel>unit</InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              value={currentIngred?.unit}
              onChange={(e) => changeIngredHandler(e.target.value, "unit")}
              style={{ width: "7rem" }}
            />
          </div>
          <div className={classes.inputGroup}>
            <InputLabel>amount</InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={currentIngred?.amount}
              onChange={(e) => changeIngredHandler(e.target.value, "amount")}
              style={{ width: "7rem" }}
            />
          </div>
          <Button
            style={{ padding: "1rem 0.5rem" }}
            onClick={addIngredHandler}
            variant="contained"
            color="secondary"
            disabled={!addIngBtn}
          >
            Add
          </Button>
        </div>

        <div className={classes.row}>
          <div className={classes.inputGroup}>
            <label className={classes.sideLabel}>Recipe description</label>
            <TextareaAutosize
              onChange={(e) => setDescription(e.target.value)}
              required
              minRows={5}
              value={description}
              style={{ width: "40rem" }}
            />
          </div>
        </div>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewRecipe;
