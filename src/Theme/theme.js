import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#03a9f4",
    },
    secondary: {
      main: "#e0e0e0",
    },
  },
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ["Roboto Slab", "Ubuntu Condensed", "sans-serif"].join(","),
    body1: {
      fontFamily: ["Ubuntu Condensed", "sans-serif"].join(","),
    },
    body2: {
      fontFamily: ["Ubuntu Condensed", "sans-serif"].join(","),
    },
  },
  spacing: 16,
  overrides: {
    // Style sheet name ⚛️
    MuiToggleButton: {
      // Name of the rule
      root: {
        color: "black",
        "&$selected": {
          color: "black",
          backgroundColor: "#03a9f4",
          border: "solid 1px #03a9f4",
        },
        "&:hover": {
          backgroundColor: "white",
        },
        "&$selected&:hover": {
          backgroundColor: "#03a9f4",
        },
      },
    },
    MuiSlider: {
      root: {
        '&.MuiSlider-marked': {
          '&:hover': {
          cursor: 'default'
        }}
      }
    }
  },
});

theme.typography.h2 = {
  fontSize: "3.75em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.75em",
  },
};

export default theme;
