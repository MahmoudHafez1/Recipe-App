import React from 'react';
import {
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import Colors from "../../constants/Colors"
import classes from "./CustomLink.module.css"



const CustomLink = ({ children, to, ...props }: LinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

 

  const activeStyle = {
    backgroundColor:Colors.primary,
    color:"#fff",
  }

  return (
    <div>
      <Link
        className={classes.customLink}
        style={match ? activeStyle : {}}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

export default CustomLink;
