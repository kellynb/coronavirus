import React from 'react';
import {useSelector} from 'react-redux';

import { Box, Typography } from '@material-ui/core';

import Chart from './chart';

const YearToDate = () => {

    const currentCountry = useSelector(state => state.currentLocation);
    const worldData =  useSelector(state => state.globalStats)
    const { virusToday } = currentCountry
    
    const updateNums = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    let cases = null
    let deaths = null

    if (virusToday) {
        cases = updateNums(virusToday.cases)
        deaths = updateNums(virusToday.deaths)
    }

    return (
        <div>
            { virusToday ? 
                <div>
                    <Box>
                        <Box display="flex" flexDirection="row" mt={1}>
                            <Box flexGrow={1}>
                                <Typography variant='h6' align='center'>Total Cases</Typography>
                                <Typography variant='body1' align='center'>{cases}</Typography>
                            </Box>
                            <Box flexGrow={1}>
                                <Typography variant='h6' align='center'>Total Deaths</Typography>
                                <Typography variant='body1' align='center'>{deaths}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    < Chart country = {currentCountry.name} countryDeaths = {virusToday.deathsPerOneMillion} globalDeaths = {worldData.deathsPerMill} />
                </div>
                :
                null
            }
        </div>
    )

}

export default YearToDate