//It needs 2 things

//A copy of the actual state
//And what you need to change

export default function posts(state = [], action) {
	switch(action.type) {
		case 'INCREMENT_LIKES':
		  return [
		  ...state.slice(0, i),
		  {...state[i], likes: state[i].likes + 1},
		  ...state.slice(i + 1)
		  ];
		default:
		  return state;
	}
}