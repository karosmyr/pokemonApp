import { Route, Switch, Redirect } from 'react-router';
import AllPokemons from './pages/AllPokemons';
import PokemonDetail from './pages/PokemonDetail';
import Favourite from './pages/Favourite';
import Layout from './components/Layout/Layout';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemons, getAllPokeTypes, getAllPokeSubtypes } from './store/pokeActions'

function App() {
	const dispatch = useDispatch();
	const pokeData = useSelector((state) => state.pokemons);

	useEffect(() => {
		dispatch(getAllPokeTypes());
		dispatch(getAllPokeSubtypes());
	}, [dispatch]);

	useEffect(() => {
		localStorage.setItem('pokeApp-fav', JSON.stringify(pokeData.favPokemons))
	}, [pokeData.favPokemons]);

	useEffect(() => {
		dispatch(
			getPokemons(
				pokeData.currentPage,
				pokeData.pageSize,
				pokeData.name,
				pokeData.chosenType,
				pokeData.chosenSubtype
			)
		);
	}, [
		dispatch,
		pokeData.currentPage,
		pokeData.pageSize,
		pokeData.name,
		pokeData.chosenType,
		pokeData.chosenSubtype,
	]);

	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					<Redirect to='/pokemon' />
				</Route>
				<Route path='/pokemon' exact>
					<AllPokemons />
				</Route>
				<Route path='/pokemon/:pokemonId'>
					<PokemonDetail />
				</Route>
				<Route path='/favourite'>
					<Favourite />
				</Route>
				<Route path='*'>
					<NotFound />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
