import { Route, Switch, Redirect } from 'react-router';
import AllPokemons from './pages/AllPokemons';
import PokemonDetail from './pages/PokemonDetail';
import Favourite from './pages/Favourite';
import Layout from './components/Layout/Layout';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getPokemons,
	getAllPokeTypes,
	getAllPokeSubtypes,
} from './store/pokemon-actions';

function App() {
	const dispatch = useDispatch();
	const pokeData = useSelector((state) => state.pokemons);
	const filterData = useSelector(state => state.filter)

	useEffect(() => {
		dispatch(getAllPokeTypes());
		dispatch(getAllPokeSubtypes());
	}, [dispatch]);

	useEffect(() => {
		localStorage.setItem('pokeApp-fav', JSON.stringify(pokeData.favPokemons));
	}, [pokeData.favPokemons]);

	useEffect(() => {
		dispatch(
			getPokemons(
				filterData.currentPage,
				filterData.pageSize,
				filterData.name,
				filterData.chosenType,
				filterData.chosenSubtype
			)
		);
	}, [
		dispatch,
		filterData.currentPage,
		filterData.pageSize,
		filterData.name,
		filterData.chosenType,
		filterData.chosenSubtype,
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
