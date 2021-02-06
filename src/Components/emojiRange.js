
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

import{ emojiLogic, emojiScale, emojiShow } from '../emojiLogic';

const contentDiv = (emoji, text) => {
    return (
        <div>
            <img src={emoji} width={30} height= {30} alt="emoji"></img>
            <Typography ariant='body2'>{text}</Typography>
        </div>
    )
}
  
const marks = [
    {
      value: 0,
      label: contentDiv(emojiShow["deathFace"], 'The Worst')
    },
    {
      value: 25,
      label: contentDiv(emojiShow["oozyFace"], 'Bad')
    },
    {
      value: 50,
      label: contentDiv(emojiShow["neutralFace"], 'Steady')
    },
    {
      value: 75,
      label: contentDiv(emojiShow["smileFace"], 'Good')
    },
    {
      value: 100,
      label: contentDiv(emojiShow["heartFace"], 'Party')
    },
  ];

const EmojiRange = (props) => {

  const [value, setValue] = React.useState(emojiScale[emojiLogic(props.country, props.world)]);

  const handleChange = (event, newValue) => {
    if (newValue === emojiScale[emojiLogic(props.country, props.world)] ) {
      setValue(newValue);
    }
  };

    return (
        <Box width={props.width}>
            <Slider
                value={value}
                step={25}
                valueLabelDisplay="off"
                marks={marks}
                track={false}
                color="primary"
                onChange={handleChange}
            />
        </Box>
    );
}

export default EmojiRange