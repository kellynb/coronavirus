import {
  getUserLocation,
  getCountries,
  getCountryData,
  getCountryLocation,
  getYesterdayGlobalData,
} from "../endpoints";

import { updateLatitudeLongitudeValue } from '../helpers';

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
  ( lat, lng ) =>
  async (dispatch) => {
   
    try {
      const updatedLat = updateLatitudeLongitudeValue(lat);
      const updatedLong = updateLatitudeLongitudeValue(lng)
      dispatch({ type: "IS_LOADING_GEO_DATA" });

      const responseData = await getCountryLocation(updatedLat, updatedLong)
      
      if (responseData === 'NO_COUNTRY_FOUND') {
        return dispatch({type: 'NO_COUNTRY_FOUND'})
      }
      
      dispatch({
        type: "CURRENT_LOCATION",
        payload: {...responseData, latitude: updatedLat, longitude: updatedLong},
      });

      const countryTodayData = await getCountryData(responseData.country_code, false);

      if (countryTodayData === "NO_COUNTRY_LOCATION") {
        return dispatch({ type: "NO_COUNTRY_LOCATION" });
      }

      dispatch({
        type: "LOCATION_TODAY_VIRUS",
        payload: countryTodayData,
      });

      const countryYestedayData = await getCountryData(responseData.country_code, true);
      if (countryTodayData === "NO_COUNTRY_LOCATION") {
        return dispatch({ type: "NO_COUNTRY_LOCATION" });
      }
      dispatch({
        type: "LOCATION_YEST_VIRUS",
        payload: countryYestedayData,
      });

      const finalCountryData = {
        country: responseData.country_name,
        virusToday: countryTodayData,
        virusYesterday: countryYestedayData,
      };

      dispatch({
        type: "UPDATE_COUNTRY",
        payload: finalCountryData,
      });
      return dispatch({ type: "HAS_LOADED_GEO_DATA" });
    } catch  (e) {
      console.log(e);
      return dispatch({ type: "GEO_CODE_ERROR" });
    }
  };
