import React, { useState } from "react";
import { useSelector } from "react-redux";

// @Components
import TwoDayCases from "./TwoDayTotal";
import YearToDate from "./YearToDate";

// @Libraries
import CircularProgress from "@material-ui/core/CircularProgress";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Box, Typography } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

export default () => {
	const { isLoadingLocationData, hasLocationError } = useSelector(
		(state) => state.loading
	);
	const [dateRangeStats, setDateRangeStats] = useState("year");

	const handleDateRange = (_e, rangeValue) => {
		if (rangeValue) {
			setDateRangeStats(rangeValue);
		}
	};

	const showLoctionError = hasLocationError && !isLoadingLocationData;
	const showYearData =
		!hasLocationError && !isLoadingLocationData && dateRangeStats === "year";
	const showTwoDaysData =
		!hasLocationError && !isLoadingLocationData && dateRangeStats !== "year";

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
				{showLoctionError && (
					<Box
						mt={2}
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<ErrorOutlineIcon color="error" fontSize="large" />
						<Box ml={1} textAlign="start">
							<Typography> Country Covid Error </Typography>
							<Typography variant="subtitle2" color="textSecondary">
								Click on the country to try again
							</Typography>
						</Box>
					</Box>
				)}
				{isLoadingLocationData && (
					<Box mt={2}>
						<CircularProgress disableShrink />
					</Box>
				)}
				{showYearData && <YearToDate />}
				{showTwoDaysData && <TwoDayCases />}
			</Box>
		</div>
	);
};
