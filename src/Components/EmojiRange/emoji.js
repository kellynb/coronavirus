import React from "react";

// @Helpers
import { emojiLogic } from "../../helpers";

// @Static
import { emojiShow } from "../../constants";

const Emoji = ({ country, world, size }) => {
  const emojiImage = emojiShow[emojiLogic(country, world)];

  return <img src={emojiImage} width={size} height={size} alt="emoji" />;
};

export default Emoji;
