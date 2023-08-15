import { createTheme } from "@material-ui/core/styles";

const colorPallete = {
  primary: {
    main: "#03a9f4",
    light: "#b3e5fc",
  },
  secondary: {
    main: "#e0e0e0",
    dark: "#bdbdbd",
  },
  error: {
    main: '#e53935'
  }
}

const theme = createTheme({
  palette: colorPallete,
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
          backgroundColor: colorPallete.primary.main,
          border: `solid 1px ${colorPallete.primary.main}`,
        },
        "&:hover": {
          backgroundColor: "white",
        },
        "&$selected&:hover": {
          backgroundColor: colorPallete.primary.main,
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
