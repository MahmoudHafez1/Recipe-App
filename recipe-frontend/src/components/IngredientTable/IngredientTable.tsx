import React from "react";

import { Ingredient } from "../../api/recipe";
import classes from "./IngredientTable.module.css";

interface IIngredients {
  ingredients: Ingredient[];
  edit?: boolean;
  removeHandler?: (a: string) => void;
}

const IngredientTable = ({
  ingredients,
  edit,
  removeHandler,
}: IIngredients) => {
  return (
    <div>
      {ingredients.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>unit</th>
              <th>amount</th>
              {edit && <th></th>}
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing, index) => (
              <tr key={index}>
                <td>{ing.name}</td>
                <td>{ing.unit}</td>
                <td>{ing.amount}</td>
                {edit && removeHandler && (
                  <td onClick={() => removeHandler(String(ing.name))}>
                    <span className={classes.remove}>remove</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IngredientTable;
