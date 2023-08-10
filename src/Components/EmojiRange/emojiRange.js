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
    <div>
      <img src={emoji} width={30} height={30} alt="emoji"></img>
      <Typography ariant="body2">{text}</Typography>
    </div>
  );
};

const EmojiRange = (props) => {
  const theme = useTheme();
  const xsMatch = useMediaQuery(theme.breakpoints.down("xs"));
  const smMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = React.useState(
    emojiScale[emojiLogic(props.country, props.world)]
  );

  const handleChange = (event, newValue) => {
    if (newValue === emojiScale[emojiLogic(props.country, props.world)]) {
      setValue(newValue);
    }
  };

  return (
    <Box width={calculateComponentWidth(xsMatch, smMatch)}>
      <Slider
        value={value}
        step={25}
        valueLabelDisplay="off"
        marks={emojiOptions.map(({value, label, emoji}) => (
            {value, label: renderLabel(emoji, label) }
          ))}
        track={false}
        color="primary"
        onChange={handleChange}
      />
    </Box>
  );
};

export default EmojiRange;
