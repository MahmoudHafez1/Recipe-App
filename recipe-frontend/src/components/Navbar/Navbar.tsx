import React from 'react';

import CustomLink from '../CustomLink/CustomLink';

import classes from "./Navbar.module.css"

const Navbar = () => {


    return (
        <div className={classes.navbar}>
            <nav>
               <CustomLink to="/">Recipes</CustomLink>
               <CustomLink to="/new">New Recipe</CustomLink>
            </nav>
        </div>
    )
}

export default Navbar;