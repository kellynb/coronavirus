

export default function(state = {}, action) {
    switch (action.type) {
      case 'ADD_COUNTRIES': {
        return action.payload
      } 
      case 'UPDATE_COUNTRY': {
        const { payload } = action
        const updCountry = {...state[payload.country]}
        updCountry['virusToday'] = payload.virusToday
        updCountry['virusYes'] = payload.virusYes

        return {
          ...state, [payload.country]: updCountry
        }
        
      }
      default:
        return state;
    }
}