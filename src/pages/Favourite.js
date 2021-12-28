import { useSelector } from 'react-redux';
import PokemonItem from '../components/Pokemons/PokemonItem';
import './Favourite.scss';

const Favourite = () => {
	const pokeData = useSelector((state) => state.pokemons);

	return (
		<>
			<h1 className='fav__heading'>Your favourite pokemons!</h1>
			<ul className='item__container'>
				{pokeData.favPokemons.map((pokemon) => (
					<PokemonItem
						key={pokemon.id}
						id={pokemon.id}
						name={pokemon.name}
						image={pokemon.images.small}
					/>
				))}
				{pokeData.favPokemons.length === 0 && (
					<p className='item__container-empty'>
						No results. Please add some pokemons first!
					</p>
				)}
			</ul>
		</>
	);
};

export default Favourite;
