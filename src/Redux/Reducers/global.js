export default function (state = {}, action) {
	switch (action.type) {
		case "GLOBAL_STATS": {
			return action.payload;
		}
		default:
			return state;
	}
}
