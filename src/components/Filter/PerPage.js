import { useDispatch, useSelector } from 'react-redux';
import { changePerPage } from '../../store/pokeActions';
import './PerPage.scss';

const PerPage = () => {
	const dispatch = useDispatch();
	const pokeData = useSelector((state) => state.pokemons);

	const cardsPerPageHandler = (e) => {
		dispatch(changePerPage(e.target.value));
	};

	const totalPageCount = Math.ceil(pokeData.totalCount / pokeData.pageSize);

	let toRange = pokeData.currentPage * pokeData.pageSize;

	if (pokeData.currentPage === totalPageCount) {
		toRange = pokeData.totalCount;
	}

	let fromRange = toRange - pokeData.pageSize + 1;

	if (pokeData.totalCount < pokeData.pageSize) {
		fromRange = 1;
	}

	return (
		<div className='perPage__container'>
			{pokeData.totalCount === 0 && (
				<div>
					0 results
				</div>
			)}
			{pokeData.totalCount !== 0 && (
				<div>
					{fromRange}-{toRange} of {pokeData.totalCount} results
				</div>
			)}
			<div className='perPage__container-control'>
				<label>Cards per page:</label>
				<select value={pokeData.pageSize} onChange={cardsPerPageHandler}>
					<option value='24'>24</option>
					<option value='48'>48</option>
					<option value='96'>96</option>
					<option value='250'>250</option>
				</select>
			</div>
		</div>
	);
};

export default PerPage;
