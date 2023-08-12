const initialState = {
    isInitialLoading: false,
    isLoadingLocationData: false,
    hasAppError: false,
    hasLocationError: false
}

export default function(state = initialState, action) {
    switch (action.type) {
      case 'IS_LOADING_INITIAL_DATA': {
        return {...state, isInitialLoading: true}
      }
      case 'HAS_LOADED_INTIAL_DATA': {
        return {...state, isInitialLoading: false}
      }
      case 'IS_LOADING_GEO_DATA': {
        return {...state, isLoadingLocationData: true}
      }
      case 'HAS_LOADED_GEO_DATA': {
        return {...state, isLoadingLocationData: false}
      }
      case "NO_COUNTRY_DATA": {
        return initialState
      }
      case "APP_ERROR" : {
        return {...state, hasAppError: true}
      }
      case "GEO_CODE_ERROR" : {
        return {...state, hasLocationError: true}
      }
      case "RESET_LOCATION_ERROR": {
        return {...state, hasLocationError: false}
      }
      default:
        return state;
    }
}