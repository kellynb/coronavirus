import React from "react";

// @Components
import Chart from "./chart";

// @Helpers
import { calculateComponentWidth, updateNums } from '../../helpers';

// @Libraries
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";


const YearToDate = () => {
  const theme = useTheme();
  const xsMatch = useMediaQuery(theme.breakpoints.down("xs"));
  const smMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const currentCountry = useSelector((state) => state.currentLocation);
  const worldData = useSelector((state) => state.globalStats);
  const { name, virusToday } = currentCountry;

  return (
    <div>
      {virusToday && (
        <div>
          <Box>
            <Box display="flex" flexDirection="row" mt={1}>
              <Box flexGrow={1}>
                <Typography variant="h6" align="center">
                  Total Cases
                </Typography>
                <Typography variant="body1" align="center">
                  {updateNums(virusToday.cases)}
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography variant="h6" align="center">
                  Total Deaths
                </Typography>
                <Typography variant="body1" align="center">
                  {updateNums(virusToday.deaths)}
                </Typography> 
              </Box>
            </Box>
          </Box>
          <Chart
            width={calculateComponentWidth(xsMatch, smMatch)}
            country={name}
            countryDeaths={virusToday.deathsPerOneMillion}
            globalDeaths={worldData.deathsPerMill}
          />
        </div>
      )}
    </div>
  );
};

export default YearToDate;
