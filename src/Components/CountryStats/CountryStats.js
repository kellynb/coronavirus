import React, { useState } from "react";
import { useSelector } from "react-redux";

// @Components
import TwoDayCases from "./TwoDayTotal";
import YearToDate from "./YearToDate";

// @Libraries
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Box, Typography } from "@material-ui/core";

export default () => {
  const { isLoadingLocationData } = useSelector((state) => state.loading);
  const [dateRangeStats, setDateRangeStats] = useState("year");

  const handleDateRange = (_e, rangeValue) => {
    if (rangeValue) {
      setDateRangeStats(rangeValue);
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        value={dateRangeStats}
        exclusive
        onChange={handleDateRange}
        aria-label="2Days/Years Toggle Buttons"
        color="black"
      >
        <ToggleButton value="year" aria-label="Year to Date Values">
          <Typography variant="body1" align="center">
            YEAR to DATE
          </Typography>
        </ToggleButton>
        <ToggleButton value="2days" aria-label="2 Day Values">
          <Typography variant="body1" align="center">
            PAST 2 DAYS
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <Box borderTop={1} mt={0.5} borderColor="secondary.main">
        {isLoadingLocationData && (<Box mt={2}><CircularProgress disableShrink/></Box>)}
        {!isLoadingLocationData && dateRangeStats === "year" && <YearToDate /> }
        {!isLoadingLocationData && dateRangeStats !== "year" && <TwoDayCases /> }
      </Box>
    </div>
  );
};
