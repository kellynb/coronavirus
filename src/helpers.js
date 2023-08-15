export const emojiLogic = (currentCountry, worldData) => {
  let emojiImg = undefined;
  const { virusToday, virusYesterday } = currentCountry;

  const countryToWorld = (currentCountry, worldData) => {
    const worldChange = ((currentCountry - worldData) / worldData) * 100;
    const findScore = score(worldChange);
    return findScore;
  };

  const countryChange = (virusToday, virusYesterday) => {
    if (virusYesterday.todayDeaths) {
      const deathChange =
        ((virusToday.todayDeaths - virusYesterday.todayDeaths) /
          virusYesterday.todayDeaths) *
        100;
      const findScore = score(deathChange);
      return findScore;
    } else if (virusToday.todayDeaths) {
      const deathChange = virusToday.todayDeaths * 100;
      const findScore = score(deathChange);
      return findScore;
    } else {
      const findScore = score(-100);
      return findScore;
    }
  };

  const score = (change) => {
    let score = 0;
    if (change <= -100) {
      score = 2;
    } else if (change <= -50) {
      score = 1;
    } else if (change <= 50) {
      score = 0;
    } else if (change <= 100) {
      score = -1;
    } else {
      score = -2;
    }
    return score;
  };

  if (virusYesterday) {
    const getScore =
    countryToWorld(
        virusToday.deathsPerOneMillion,
        worldData.deathsPerMill
      ) + countryChange(virusToday, virusYesterday);

    if (getScore < -2) {
      emojiImg = "deathFace";
    } else if (getScore < 0) {
      emojiImg = "oozyFace";
    } else if (getScore < 2) {
      emojiImg = "neutralFace";
    } else if (getScore < 4) {
      emojiImg = "smileFace";
    } else {
      emojiImg = "heartFace";
    }
  }

  return emojiImg;
};

export const calculateContainerWidth = (isBelowXSM, isBelowSM) => {
  if (isBelowXSM) {
    return 300
  }
  if (isBelowSM) {
    return 350
  }
  return 500
}

export const calculateComponentWidth = (isBelowXSM, isBelowSM) => {
  if (isBelowXSM) {
    return 250
  }
  if (isBelowSM) {
    return 350
  }
  return 400
}

export const updateLatitudeLongitudeValue = (number) => {
  const numStr = number.toString();
  const dotIndx = numStr.indexOf(".");
  const finalStr = numStr.slice(0, dotIndx + 7);
  const finalFlt = parseFloat(finalStr);
  return finalFlt;
};

export const updateNums = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
