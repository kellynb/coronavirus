import React from "react";
import { useSelector } from "react-redux";

// @Helpers
import { updateNums } from '../../helpers';

// @Libraries
import { Box, Typography } from "@material-ui/core";

const TwoDayTotal = () => {
  const currentCountry = useSelector((state) => state.currentLocation);
  const { virusToday, virusYesterday } = currentCountry;

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
                  {updateNums(virusToday.todayCases + virusYesterday.todayCases)}
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography variant="h6" align="center">
                  Deaths
                </Typography>
                <Typography variant="body1" align="center">
                  {updateNums(virusToday.todayDeaths + virusYesterday.todayDeaths)}
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
