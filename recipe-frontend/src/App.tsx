import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from "@mui/material/styles";

import './App.css';
import theme from "./UI/theme";
import Navbar from './components/Navbar/Navbar';
import RecipeList from './Pages/RecipeList/RecipeList';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';
import NewRecipe from './Pages/NewRecipe/NewRecipe';

function App() {
  return (
    <ThemeProvider theme={theme}>
       <div className="App">
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeList />}>
          </Route>
          <Route path="/new" element={<NewRecipe />}>
          </Route>
          <Route path="/:id" element={<RecipeDetails />}>
          </Route>
        </Routes>
      </BrowserRouter>
     
      </div>
    </ThemeProvider>
   
  );
}

export default App;
