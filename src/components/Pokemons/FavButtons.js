import { useDispatch, useSelector } from 'react-redux';
import { addPokemonToFav, removePokemonFromFav } from '../../store/pokeActions';

const FavButtons = (props) => {
	const dispatch = useDispatch();
	const pokeData = useSelector((state) => state.pokemons);
	const addToFavHandler = () => {
		let pokemonToAdd;
		if (pokeData.pokemons.length === 0) {
			pokemonToAdd = pokeData.pokemonDetail[0];
		} else {
			pokemonToAdd = pokeData.pokemons.find((el) => el.id === props.id);
		}
		dispatch(addPokemonToFav(pokemonToAdd));
	};

	const removeFromFavHandler = () => {
		dispatch(removePokemonFromFav(props.id));
	};

	return (
		<>
			{pokeData.favPokemons.find((el) => el.id === props.id) ? (
				<button className={props.className} onClick={removeFromFavHandler}>
					REMOVE FROM FAVOURITES
				</button>
			) : (
				<button className={props.className} onClick={addToFavHandler}>
					ADD TO FAVOURITES
				</button>
			)}
		</>
	);
};

export default FavButtons;
