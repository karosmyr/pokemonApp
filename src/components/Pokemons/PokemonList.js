import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPage } from '../../store/pokemon-actions';
import LoadingSpinner from '../UI/LoadingSpinner';
import PokemonItem from './PokemonItem';
import Pagination from '../Pagination/Pagination';
import useWindowSize from '../UI/useWindowSize';

import './PokemonList.scss';

const PokemonList = () => {
	const dispatch = useDispatch();
	const pokeData = useSelector((state) => state.pokemons);
	const filterData = useSelector((state) => state.filter);

	const size = useWindowSize();
	let siblingCount;
	if (size.width <= 576) {
		siblingCount = 0;
	} else {
		siblingCount = 1;
	}

	return (
		<>
			{pokeData.loading ? (
				<section className='centered'>
					<LoadingSpinner />
				</section>
			) : pokeData.error ? (
				<section className='centered'>
					<p>{pokeData.error}</p>
				</section>
			) : (
				<section>
					<ul className='item__container'>
						{pokeData.pokemons.map((pokemon) => (
							<PokemonItem
								key={pokemon.id}
								id={pokemon.id}
								name={pokemon.name}
								image={pokemon.images.small}
							/>
						))}
						{pokeData.pokemons.length === 0 && <p className='item__container-empty'>No results. Please change the filter requirements.</p>}
					</ul>
					<Pagination
						siblingCount={siblingCount}
						currentPage={filterData.currentPage}
						pageSize={filterData.pageSize}
						totalCount={pokeData.totalCount}
						onPageChange={(page) => dispatch(changeCurrentPage(page))}
					/>
				</section>
			)}
		</>
	);
};

export default PokemonList;
