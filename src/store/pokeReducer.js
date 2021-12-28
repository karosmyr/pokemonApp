import {
	GET_POKEMONS_REQUEST,
	GET_POKEMONS_SUCCESS,
	GET_POKEMONS_FAILURE,
	CHANGE_PER_PAGE_VALUE,
	CHANGE_CURRENT_PAGE,
	GET_TYPES,
	GET_SUBTYPES,
	GET_CHOSEN_TYPE,
	GET_CHOSEN_SUBTYPE,
	GET_CHOSEN_NAME,
	GET_POKEMON_DETAIL,
	ADD_POKEMON_TO_FAV,
	REMOVE_POKEMON_FROM_FAV,
} from './actionTypes';

const initialState = {
	loading: false,
	pokemons: [],
	pokemonDetail: [],
	favPokemons: localStorage.getItem('pokeApp-fav')
		? JSON.parse(localStorage.getItem('pokeApp-fav'))
		: [],
	error: '',
	totalCount: '',
	currentPage: 1,
	pageSize: 24,
	types: [],
	chosenType: '',
	subtypes: [],
	chosenSubtype: '',
	name: '',
};

const pokeReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_POKEMONS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case GET_POKEMONS_SUCCESS:
			return {
				...state,
				loading: false,
				pokemons: action.payload.data,
				totalCount: action.payload.totalCount,
			};
		case GET_POKEMONS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CHANGE_PER_PAGE_VALUE:
			return {
				...state,
				pageSize: action.payload,
				currentPage: 1,
			};
		case CHANGE_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.payload,
			};
		case GET_TYPES:
			return {
				...state,
				types: action.payload.data,
			};
		case GET_SUBTYPES:
			return {
				...state,
				subtypes: action.payload.data,
			};
		case GET_CHOSEN_TYPE:
			return {
				...state,
				chosenType: action.payload,
				currentPage: 1,
			};
		case GET_CHOSEN_SUBTYPE:
			return {
				...state,
				chosenSubtype: action.payload,
				currentPage: 1,
			};
		case GET_CHOSEN_NAME:
			return {
				...state,
				name: action.payload,
			};
		case GET_POKEMON_DETAIL:
			return {
				...state,
				loading: false,
				pokemonDetail: action.payload.data,
			};
		case ADD_POKEMON_TO_FAV:
			return {
				...state,
				favPokemons: [{ ...action.payload }, ...state.favPokemons],
			};
		case REMOVE_POKEMON_FROM_FAV:
			return {
				...state,
				favPokemons: state.favPokemons.filter(
					(item) => item.id !== action.payload
				),
			};
		default:
			return state;
	}
};

export default pokeReducer;
