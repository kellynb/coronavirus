import React from "react";

// @Library
import { Box, Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// @Helpers
import { emojiLogic, calculateComponentWidth } from "../../helpers";

// @Static
import { emojiScale, emojiOptions } from "../../constants";

const renderLabel = (emoji, text) => {
  return (
    <Box textAlign='center'>
      <img src={emoji} width={30} height={30} alt="emoji"></img>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

const EmojiRange = ({country, world}) => {

  const theme = useTheme();
  const xsMatch = useMediaQuery(theme.breakpoints.down("xs"));
  const smMatch = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box width={calculateComponentWidth(xsMatch, smMatch)} textAlign='center'>
      <Slider
        value={emojiScale[emojiLogic(country, world)]}
        step={25}
        valueLabelDisplay="off"
        marks={emojiOptions.map(({value, label, emoji}) => (
            {value, label: renderLabel(emoji, label) }
          ))}
        track={false}
        color="primary"
      />
    </Box>
  );
};

export default EmojiRange;
