import React from "react";
import { useSelector } from "react-redux";

import { Box, Typography } from "@material-ui/core";

const TwoDayTotal = () => {
  const currentCountry = useSelector((state) => state.currentLocation);
  const { virusToday, virusYesterday } = currentCountry;

  const updateNums = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let cases = null;
  let deaths = null;

  if (virusToday) {
    cases = updateNums(virusToday.todayCases + virusYesterday.todayCases);
    deaths = updateNums(virusToday.todayDeaths + virusYesterday.todayDeaths);
  }

  return (
    <div>
      {virusToday && (
        <div>
          <Box>
            <Box display="flex" flexDirection="row" mt={1}>
              <Box flexGrow={1}>
                <Typography variant="h6" align="center">
                  {" "}
                  New Cases
                </Typography>
                <Typography variant="body1" align="center">
                  {cases}
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography variant="h6" align="center">
                  Deaths
                </Typography>
                <Typography variant="body1" align="center">
                  {deaths}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default TwoDayTotal;
