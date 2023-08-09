export default function (state = {}, action) {
  switch (action.type) {
    case "CURRENT_LOCATION": {
      const { payload } = action;
      return {
        ...state,
        country: payload.country_code,
        name: payload.country_name,
        lat: payload.latitude,
        long: payload.longitude,
      };
    }
    case "COUNTRY_VIRUS_DATA": {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
