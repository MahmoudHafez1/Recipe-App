import React from "react";
import { RevolvingDot } from "react-loader-spinner";

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.container}>
      <RevolvingDot height="100" width="100" color="blue" ariaLabel="loading" />
    </div>
  );
};

export default LoadingSpinner;
