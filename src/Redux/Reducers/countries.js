export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_COUNTRIES": {
      return action.payload;
    }
    case "UPDATE_COUNTRY": {
      const {
        payload: { country, virusToday, virusYesterday },
      } = action;
      const updCountry = { ...state[country], virusToday, virusYesterday };
      return {
        ...state,
        [country]: updCountry,
      };
    }
    default:
      return state;
  }
}
