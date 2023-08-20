import deathFace from "./Images/death_face.png";
import heartFace from "./Images/hear_face.png";
import neutralFace from "./Images/neutral.png";
import oozyFace from "./Images/oozy_face.png";
import smileFace from "./Images/smile.png";

export const emojiShow = {
	deathFace: deathFace,
	oozyFace: oozyFace,
	neutralFace: neutralFace,
	smileFace: smileFace,
	heartFace: heartFace,
};

export const emojiScale = {
	deathFace: 0,
	oozyFace: 25,
	neutralFace: 50,
	smileFace: 75,
	heartFace: 100,
};

export const emojiOptions = [
	{
		value: 0,
		label: "The Plague",
		emoji: deathFace,
	},
	{
		value: 25,
		label: "Big Risk",
		emoji: oozyFace,
	},
	{
		value: 50,
		label: "Livable",
		emoji: neutralFace,
	},
	{
		value: 75,
		label: "Self Party",
		emoji: smileFace,
	},
	{
		value: 100,
		label: "Block Party",
		emoji: heartFace,
	},
];
