import {
  getUserLocation,
  getCountries,
  getCountryData,
  getYesterdayGlobalData,
} from "../endpoints";

export const initialData = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_LOADING_INITIAL_DATA" });
    const user = await getUserLocation();
    dispatch({
      type: "CURRENT_LOCATION",
      payload: user,
    });
    const countries = await getCountries();
    dispatch({
      type: "ADD_COUNTRIES",
      payload: countries,
    });
    const countryTodayData = await getCountryData(user.country, false);

    if (countryTodayData === "NO_COUNTRY_LOCATION") {
      return dispatch({ type: "NO_COUNTRY_LOCATION" });
    }
    dispatch({
      type: "LOCATION_TODAY_VIRUS",
      payload: countryTodayData,
    });

    const countryYestedayData = await getCountryData(user.country, true);
    if (countryTodayData === "NO_COUNTRY_LOCATION") {
      return dispatch({ type: "NO_COUNTRY_LOCATION" });
    }
    dispatch({
      type: "LOCATION_YEST_VIRUS",
      payload: countryYestedayData,
    });

    const finalCountryData = {
      country: user.country,
      virusToday: countryTodayData,
      virusYesterday: countryYestedayData,
    };

    dispatch({
      type: "UPDATE_COUNTRY",
      payload: finalCountryData,
    });
    const globalYesterdayData = await getYesterdayGlobalData();

    dispatch({
      type: "GLOBAL_STATS",
      payload: globalYesterdayData,
    });

    return dispatch({ type: "HAS_LOADED_INTIAL_DATA" });
  } catch (e) {
    console.log(e);
    return dispatch({ type: "APP_ERROR" });
  }
};

export const findCountry =
  ({ lat, lng }) =>
  async (dispatch) => {
    // function to only have 6 spots past decimal poing
    const updateLatLng = (ltLngNum) => {
      const numStr = ltLngNum.toString();
      const dotIndx = numStr.indexOf(".");
      const finalStr = numStr.slice(0, dotIndx + 7);
      const finalFlt = parseFloat(finalStr);
      return finalFlt;
    };
    const geoRes = await fetch(
      `/geocode/?lat=${updateLatLng(lat)}&long=${updateLatLng(lng)}`
    );
    const resData = await geoRes.json();

    // if a body of water break
    if (resData.results[0].components["_type"] === "body_of_water") {
      return;
    }
    const isoCountry = resData.results[0].components["ISO_3166-1_alpha-2"];
    const name = resData.results[0].components.country;

    const payload = {
      country_code: isoCountry,
      country_name: name,
      latitude: updateLatLng(lat),
      longitude: updateLatLng(lng),
    };

    // update current location with new lat/lon/coutnry
    dispatch({
      type: "CURRENT_LOCATION",
      payload: payload,
    });
    // // get country stats
    // dispatch(getCountryVirusData(isoCountry));
  };
