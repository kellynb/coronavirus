import React from "react";

// @Hooks
import { useTheme } from "@material-ui/core/styles";

// @Libraries
import { Box, Typography } from "@material-ui/core";
import { ResponsiveBar } from "@nivo/bar";

const Tooltip = ({ value, color, indexValue, muiTheme, ...rest}) => {
  const bgColor = indexValue === 'World' ? muiTheme.palette.secondary.dark : muiTheme.palette.primary.light

  return(
    <Box bgcolor={bgColor} m='-10px' p={0.5} display="flex" flexDirection="column">
      <Typography variant="caption" >{indexValue} </Typography>
      <Typography variant="caption" >{value} Deaths/Million</Typography>
    </Box>
  )
}

const CovidDeathChart = ({ country, countryDeaths, globalDeaths, width}) => {
  const theme = useTheme();

  return (
    <Box mt={1} height={200} width={width}>
      <Box>
        <Typography variant="body1" align="center">
          Deaths per Million
        </Typography>
        <Typography variant="body2" align="center">
          Country vs World
        </Typography>
      </Box>
      <ResponsiveBar
        data={[
          {
            place: country,
            "Deaths Country": countryDeaths,
          },
          {
            place: "World",
            "Deaths World": globalDeaths,
          },
        ]}
        keys={["Deaths Country", "Deaths World"]}
        indexBy="place"
        margin={{ top: 20, right: 70, bottom: 10, left: 70 }}
        colors={[theme.palette.primary.main, theme.palette.secondary.main]}
        pixelRatio={1}
        padding={0.5}
        layout="horizontal"
        borderWidth={1}
        borderRadius={2}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisLeft={{ tickSize: 0, tickPadding: 10, tickRotation: 45 }}
        axisBottom={null}
        axisRight={null}
        axisTop={null}
        enableGridX
        enableGridY={false}
        enableLabel
        labelSkipWidth={1}
        labelSkipHeight={1}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        tooltip={(props) => <Tooltip muiTheme={theme} {...props}/>}
      />
    </Box>
  );
};

export default CovidDeathChart;
