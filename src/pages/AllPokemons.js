import PokemonList from '../components/Pokemons/PokemonList';
import PerPage from '../components/Filter/PerPage';
import PokemonsFilter from '../components/Filter/PokemonsFilter';

const AllPokemons = () => {
	return (
		<>
			<PokemonsFilter />
			<PerPage />
			<PokemonList />
		</>
	);
};

export default AllPokemons;
