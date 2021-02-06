
import React, { useState } from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Box, Typography } from '@material-ui/core';

import TwoDayCases from './Components/twoDayTot';
import YearToDate from './Components/yearToDate';

export default function ToggleButtons(props) {
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment) {
      setAlignment(newAlignment);
    } 
  };

  return (
     <div>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        color = "black"
      >
        <ToggleButton value="left" aria-label="left aligned">
          <Typography variant='body1' align='center'>YEAR to DATE</Typography>
        </ToggleButton>
        <ToggleButton value="right" aria-label="centered">
          <Typography variant='body1' align='center'>PAST 2 DAYS</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <Box borderTop={1} mt={0.5} borderColor="secondary.main">
        { alignment === "left" ? < YearToDate width={props.width}/> : < TwoDayCases />}
      </Box>
    </div>
  );
}




