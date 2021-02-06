import React from "react";
import { ResponsiveBar } from '@nivo/bar'

import { Box, Typography } from '@material-ui/core';


const BarChart = (props) => {
    return (
        <Box mt={1} height={200} width={props.width}>
            <Box>
                <Typography variant='body1' align='center'>Deaths per Million</Typography>
                <Typography variant='body2' align='center'>Country vs World</Typography>
            </Box>
                <ResponsiveBar
                    data={[
                        {
                            'place': props.country,
                            'Deaths Country': props.countryDeaths,
                        },
                        {
                            'place': 'World',
                            'Deaths World': props.globalDeaths,  
                        }
                    ]}

                    keys={["Deaths Country", "Deaths World"]}
                    indexBy="place"
                    margin={{ top: 20, right: 70, bottom: 10, left: 70 }}
                    colors={['#03a9f4', '#e0e0e0']}
                    pixelRatio={1}
                    padding={0.5}
                    layout="horizontal"
                    reverse={false}
                    borderWidth={1}
                    borderRadius={2}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={props.width < 350 ? { tickSize: 0, tickPadding: 5, tickRotation: 0, tickValues: [50, 200, 400, 600]} : null }
                    axisRight={null}
                    axisBottom={null}
                    axisLeft={{tickSize: 0, tickPadding: 10, tickRotation: 45}}
                    enableGridX={true}
                    
                    enableGridY={false}
                    enableLabel={true}
                    labelSkipWidth={1}
                    labelSkipHeight={1}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    isInteractive={false}

                />
        </Box>
    )
}

export default BarChart;