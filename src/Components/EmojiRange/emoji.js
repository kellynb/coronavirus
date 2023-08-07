import React from "react";
import { emojiShow } from "../../constants";
import { emojiLogic } from "../../helpers";

const Emoji = ({ country, world, size }) => {
  const emojiImage = emojiShow[emojiLogic(country, world)];

  return <img src={emojiImage} width={size} height={size} alt="emoji" />;
};

export default Emoji;
