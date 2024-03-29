import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// @Components
import CircularProgress from "@material-ui/core/CircularProgress";
import Emoji from "./Components/EmojiRange/emoji";
import EmojiRange from "./Components/EmojiRange/emojiRange";
import CountryStats from "./Components/CountryStats/CountryStats";

// @Helpers
import { calculateContainerWidth } from "./helpers";

// @Libraries
import { Box, Grid, Container, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import GoogleMapReact from "google-map-react";

// @Redux
import { initialData } from "./Redux/actions";
import { findCountry } from "./Redux/actions";

function App() {
	const currentCountry = useSelector((state) => state.currentLocation);
	const worldData = useSelector((state) => state.globalStats);
	const {
		isInitialLoading,
		isLoadingLocationData,
		hasAppError,
		hasLocationError,
	} = useSelector((state) => state.loading);

	const dispatch = useDispatch();
	const theme = useTheme();
	const xsMatch = useMediaQuery(theme.breakpoints.down("xs"));
	const smMatch = useMediaQuery(theme.breakpoints.down("sm"));

	const { name, lat, long, virusYesterday } = currentCountry;

	useEffect(() => {
		dispatch(initialData());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onMapChange = ({ lat, lng }) => {
		dispatch(findCountry(lat, lng));
	};

	const renderCountryName = () => {
		if (isLoadingLocationData) {
			return <CircularProgress size={28} />;
		}
		if (hasLocationError) {
			return (
				<>
					<Box display="flex" alignItems="center">
						<ErrorOutlineIcon color="error" fontSize="large" />
						<Box ml={1}>
							<Typography> Country Covid Error </Typography>
							<Typography variant="subtitle2" color="textSecondary">
								Click on the country to try again
							</Typography>
						</Box>
					</Box>
				</>
			);
		}

		return <Typography variant="h4">{name}</Typography>;
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
				{hasAppError ? (
					<Box m="15% 0 0 0">
						<Typography variant="h4" align="center" color="error">
							App Error: Attacked by COVID
						</Typography>
						<Typography variant="h6" align="center" color="textSecondary">
							Please Refresh to Try Again
						</Typography>
					</Box>
				) : (
					<Grid container direction="row" justifyContent="space-around" my={2}>
						<Box width={600} height={550} mb={2}>
							{isInitialLoading && (
								<Skeleton
									width="100%"
									height="100%"
									animation="wave"
									variant="rect"
								/>
							)}
							{!isInitialLoading && typeof lat == "number" && (
								<GoogleMapReact
									bootstrapURLKeys={{ key: process.env.REACT_APP_MAP }}
									defaultCenter={{ lat, lng: long }}
									defaultZoom={4}
									onClick={onMapChange}
								>
									<Box lat={lat} lng={long}>
										{isLoadingLocationData && <CircularProgress size={35} />}
										{!isLoadingLocationData && hasLocationError && (
											<ErrorOutlineIcon color="error" fontSize="large" />
										)}
										{!isLoadingLocationData &&
											!hasLocationError &&
											virusYesterday && (
												<Emoji
													size={35}
													country={currentCountry}
													world={worldData}
												/>
											)}
									</Box>
								</GoogleMapReact>
							)}
						</Box>

						<Box
							width={calculateContainerWidth(xsMatch, smMatch)}
							display="flex"
							flexDirection="column"
							alignItems="center"
						>
							{isInitialLoading && (
								<Skeleton
									width="100%"
									height={550}
									animation="wave"
									variant="rect"
								/>
							)}
							{!isInitialLoading && (
								<div>
									<Box display="flex" justifyContent="center">
										<Typography variant="h4">Country:</Typography>
										<Box ml={1} alignItems="center" display="inline-flex">
											{renderCountryName()}
										</Box>
									</Box>
									<Box mt={1} mb={4}>
										{virusYesterday && (
											<EmojiRange country={currentCountry} world={worldData} />
										)}
									</Box>

									<Box align="center" mt={0.5} width={"auto"} mb={4}>
										<CountryStats />
									</Box>
								</div>
							)}
						</Box>
					</Grid>
				)}
			</Box>
		</Container>
	);
}

export default App;
