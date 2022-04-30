import { createTheme } from "@mui/material/styles";

import Colors from "../constants/Colors";

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

export default theme;
