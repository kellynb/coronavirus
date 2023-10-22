const UserEndpoints = {
	location: "https://ipapi.co/json/",
	geoLocation: (lat, long) =>
		`https://geocode.maps.co/reverse?lat=${lat}&lon=${long}`,
};

const VirusEndpoints = {
	countryTotal: (country, isYesterday) =>
		`https://corona.lmao.ninja/v2/countries/${country}?yesterday=${isYesterday}&strict=true&query`,
	yesterdayCountries: "https://corona.lmao.ninja/v2/all?yesterday",
};

export const getUserLocation = async () => {
	const userResponse = await fetch(UserEndpoints.location);
	const user = await userResponse.json();
	return user;
};

export const getCountryData = async (country, isYesterday) => {
	const data = await fetch(VirusEndpoints.countryTotal(country, isYesterday), {
		mode: "no-cors",
	});
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
	const globalResponse = await fetch(VirusEndpoints.yesterdayCountries, {
		mode: "no-cors",
	});
	const globalData = await globalResponse.json();

	return {
		cases: globalData.cases,
		casesPerMill: globalData.casesPerOneMillion,
		deathsPerMill: globalData.deathsPerOneMillion,
	};
};

export const getCountryLocation = async (lat, long) => {
	const response = await fetch(UserEndpoints.geoLocation(lat, long));
	const data = await response.json();

	if ("error" in data) {
		return "NO_COUNTRY_FOUND";
	}

	return {
		country_code: data.address.country_code,
		country_name: data.address.country,
	};
};
