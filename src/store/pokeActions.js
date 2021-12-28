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
import axios from 'axios';

const getPokemonsRequest = () => {
	return {
		type: GET_POKEMONS_REQUEST,
	};
};

const getPokemonsFailure = (error) => {
	return {
		type: GET_POKEMONS_FAILURE,
		payload: error,
	};
};

const getPokemonsSuccess = (pokemons) => {
	return {
		type: GET_POKEMONS_SUCCESS,
		payload: pokemons,
	};
};

export const getPokemons = (pageNumber, pageSize, name, type, subtype) => {
	return async (dispatch) => {
		dispatch(getPokemonsRequest());

		const getPoke = async () => {
			const response = await axios.get(
				`https://api.pokemontcg.io/v2/cards?page=${pageNumber}&pageSize=${pageSize}&q=%20name:${name}*${type}${subtype}`,
				{
					headers: {
						'X-Api-Key': '11f2cb7b-47e8-4f51-93bc-53c692d0cf9b',
					},
				}
			);
			return response.data;
		};

		try {
			const pokemons = await getPoke();
			dispatch(getPokemonsSuccess(pokemons));
		} catch (error) {
			dispatch(getPokemonsFailure(error.message));
		}
	};
};

const changePerPageValue = (perPage) => {
	return {
		type: CHANGE_PER_PAGE_VALUE,
		payload: perPage,
	};
};

export const changePerPage = (perPage) => {
	return (dispatch) => {
		dispatch(changePerPageValue(perPage));
	};
};

const changeCurrentPageValue = (page) => {
	return {
		type: CHANGE_CURRENT_PAGE,
		payload: page,
	};
};

export const changeCurrentPage = (page) => {
	return (dispatch) => {
		dispatch(changeCurrentPageValue(page));
	};
};

const getAllTypes = (types) => {
	return {
		type: GET_TYPES,
		payload: types,
	};
};

export const getAllPokeTypes = () => {
	return (dispatch) => {
		axios
			.get('https://api.pokemontcg.io/v2/types', {
				headers: {
					'X-Api-Key': '11f2cb7b-47e8-4f51-93bc-53c692d0cf9b',
				},
			})
			.then((response) => {
				dispatch(getAllTypes(response.data));
			});
	};
};

const getAllSubtypes = (subtypes) => {
	return {
		type: GET_SUBTYPES,
		payload: subtypes,
	};
};

export const getAllPokeSubtypes = () => {
	return (dispatch) => {
		axios
			.get('https://api.pokemontcg.io/v2/subtypes', {
				headers: {
					'X-Api-Key': '11f2cb7b-47e8-4f51-93bc-53c692d0cf9b',
				},
			})
			.then((response) => {
				dispatch(getAllSubtypes(response.data));
			});
	};
};

const chosenType = (type) => {
	return {
		type: GET_CHOSEN_TYPE,
		payload: type,
	};
};

export const getChosenType = (type) => {
	return (dispatch) => {
		dispatch(chosenType(type));
	};
};

const chosenSubtype = (subtype) => {
	return {
		type: GET_CHOSEN_SUBTYPE,
		payload: subtype,
	};
};

export const getChosenSubtype = (subtype) => {
	return (dispatch) => {
		dispatch(chosenSubtype(subtype));
	};
};

const chosenName = (name) => {
	return {
		type: GET_CHOSEN_NAME,
		payload: name,
	};
};

export const getChosenName = (name) => {
	return (dispatch) => {
		dispatch(chosenName(name));
	};
};

const pokemonDetail = (pokemon) => {
	return {
		type: GET_POKEMON_DETAIL,
		payload: pokemon,
	};
};

export const getPokemonDetail = (pokemonId) => {
	return async (dispatch) => {
		dispatch(getPokemonsRequest());

		const getDetail = async () => {
			const response = await axios.get(
				`https://api.pokemontcg.io/v2/cards?q=id:${pokemonId}`,
				{
					headers: {
						'X-Api-Key': '11f2cb7b-47e8-4f51-93bc-53c692d0cf9b',
					},
				}
			);
			return response.data;
		};

		try {
			const detail = await getDetail();
			dispatch(pokemonDetail(detail));
		} catch (error) {
			dispatch(getPokemonsFailure(error.message));
		}
	};
};

const addToFav = (pokemon) => {
	return {
		type: ADD_POKEMON_TO_FAV,
		payload: pokemon,
	};
};

export const addPokemonToFav = (pokemon) => {
	return (dispatch) => {
		dispatch(addToFav(pokemon));
	};
};

const removeFromFav = (pokemonId) => {
	return {
		type: REMOVE_POKEMON_FROM_FAV,
		payload: pokemonId,
	};
};

export const removePokemonFromFav = (pokemonId) => {
	return (dispatch) => {
		dispatch(removeFromFav(pokemonId));
	};
};
