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
    case "LOCATION_TODAY_VIRUS": {
      return {
        ...state,
        virusToday: action.payload,
      };
    }
    case "LOCATION_YEST_VIRUS": {
      return {
        ...state,
        virusYesterday: action.payload,
      };
    }
    default:
      return state;
  }
}
