import React, { useState, useEffect } from "react";
import { TextField, Button, InputLabel, TextareaAutosize } from "@mui/material";
import axios from "axios";

import classes from "./NewRecipe.module.css";
import { createRecipe } from "../../api/recipe";

type Ingredient = {
  name?: string;
  unit?: string;
  amount?: number;
};

const NewRecipe = () => {
  const [title, setTitle] = useState<String>();
  const [ingredients, setIngredients] = useState<Ingredient[]>();
  const [currentIngred, setCurrentIngred] = useState<Ingredient>();
  const [addIngBtn, setAddIngBtn] = useState(false);
  const [description, setDescription] = useState<String>();
  const [imgName, setImgName] = useState<String>();

  const imgRef = React.createRef<HTMLInputElement>();

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
      await createRecipe(formData);
      alert("Recipe created successfully");
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
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>unit</th>
                  <th>amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ing, index) => (
                  <tr key={index}>
                    <td>{ing.name}</td>
                    <td>{ing.unit}</td>
                    <td>{ing.amount}</td>
                    <td onClick={() => removeIngredHandler(String(ing.name))}>
                      <span className={classes.remove}>remove</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            className={classes.addIng}
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
