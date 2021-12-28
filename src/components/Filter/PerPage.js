import { useDispatch, useSelector } from 'react-redux';
import { changePerPage } from '../../store/pokemon-actions';
import './PerPage.scss';

const PerPage = () => {
	const dispatch = useDispatch();
	const pokeData = useSelector((state) => state.pokemons);
	const filterData = useSelector((state) => state.filter);

	const cardsPerPageHandler = (e) => {
		dispatch(changePerPage(e.target.value));
	};

	const totalPageCount = Math.ceil(pokeData.totalCount / filterData.pageSize);

	let toRange = filterData.currentPage * filterData.pageSize;

	if (filterData.currentPage === totalPageCount) {
		toRange = pokeData.totalCount;
	}

	let fromRange = toRange - filterData.pageSize + 1;

	if (pokeData.totalCount < filterData.pageSize) {
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
				<select value={filterData.pageSize} onChange={cardsPerPageHandler}>
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
