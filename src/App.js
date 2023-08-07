import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// @Components
import Emoji from "./Components/EmojiRange/emoji";
import EmojiRange from "./Components/EmojiRange/emojiRange";
import CountryStats from "./Components/CountryStats/CountryStats";

// @Helpers
import { calculateContainerWidth } from './helpers';

// @Libraries
import { Box, Grid, Container, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import GoogleMapReact from "google-map-react";

// @Redux
import { initialData } from "./Redux/actions";
import { findCountry } from "./Redux/actions";

// @Styles
import "./App.css";

function App() {
  const currentCountry = useSelector((state) => state.currentLocation);
  const worldData = useSelector((state) => state.globalStats);
  const dispatch = useDispatch();
  const theme = useTheme();
  const xsMatch = useMediaQuery(theme.breakpoints.down("xs"));
  const smMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const { name, lat, long, virusYesterday } = currentCountry;

  useEffect(() => {
    dispatch(initialData());
  }, []);

  const getMapChange = ({ lat, lng }) => {
    dispatch(findCountry({ lat, lng }));
  };

  return (
    <Container>
      <Box mt={3} borderColor="primary.main">
        <Typography variant="h2" align="center">
          Coronavirus Emoji Score
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          Click on a Country, get the Emoji Score
        </Typography>
      </Box>
      <Box mt={2} mb={5}>
        <Grid container direction="row" justifyContent="space-around" my={2}>
          {typeof lat == "number" && (
            <Box width={600} height={550} boxShadow={3} mb={2}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP }}
                defaultCenter={{ lat: lat, lng: long }}
                defaultZoom={4}
                onClick={getMapChange}
              >
                {virusYesterday && (
                  <Emoji
                    size={35}
                    country={currentCountry}
                    world={worldData}
                    lat={lat}
                    lng={long}
                  />
                )}
              </GoogleMapReact>
            </Box>
          )}
          <Box
            width={calculateContainerWidth(xsMatch, smMatch)}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box>
              <Typography variant="h4" align="center">
                {name}
              </Typography>
            </Box>
            <Box mt={1} mb={4}>
              {virusYesterday && (
                <EmojiRange
                  country={currentCountry}
                  world={worldData}
                />
              )}
            </Box>
            <Box align="center" mt={0.5} width={"auto"} mb={4}>
              <CountryStats />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
