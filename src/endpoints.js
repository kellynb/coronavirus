const UserEndpoints = {
  location: "https://ipapi.co/json/",
};

const VirusEndpoints = {
  countries: "https://corona.lmao.ninja/v2/countries",
  countryTotal: (country, isYesterday) =>
    `https://corona.lmao.ninja/v2/countries/${country}?yesterday=${isYesterday}&strict=true&query`,
  yesterdayCountries: "https://corona.lmao.ninja/v2/all?yesterday",
};

export const getUserLocation = async () => {
  const userResponse = await fetch(UserEndpoints.location);
  const user = await userResponse.json();
  return user;
};

export const getCountries = async () => {
  const response = await fetch(VirusEndpoints.countries);
  const countries = await response.json();
  return countries.reduce((countryObj, country) => {
    countryObj[country.countryInfo.iso2] = {
      iso2: country.countryInfo.iso2,
      name: country.country,
    };
    return countryObj;
  }, {});
};

export const getCountryData = async (country, isYesterday) => {
  const data = await fetch(VirusEndpoints.countryTotal(country, isYesterday));
  const countryCovidData = await data.json();

  if ("message" in countryCovidData) {
    return "NO_COUNTRY_LOCATION";
  }

  return {
    cases: countryCovidData.cases,
    deaths: countryCovidData.deaths,
    todayCases: countryCovidData.todayCases,
    todayDeaths: countryCovidData.todayDeaths,
    population: countryCovidData.population,
    casesPerOneMillion: countryCovidData.casesPerOneMillion,
    deathsPerOneMillion: countryCovidData.deathsPerOneMillion,
  };
};

export const getYesterdayGlobalData = async () => {
  const globalResponse = await fetch(VirusEndpoints.yesterdayCountries);
  const globalData = await globalResponse.json();

  return {
    cases: globalData.cases,
    casesPerMill: globalData.casesPerOneMillion,
    deathsPerMill: globalData.deathsPerOneMillion,
  };
};
