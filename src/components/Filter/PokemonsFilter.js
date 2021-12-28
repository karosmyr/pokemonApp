import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenType, getChosenSubtype, getChosenName } from '../../store/pokemon-actions';
import './PokemonsFilter.scss';

const PokemonsFilter = () => {
	const dispatch = useDispatch();
	const filterData = useSelector((state) => state.filter);
	const [enteredName, setEnteredName] = useState(filterData.name);

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(getChosenName(enteredName));
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [enteredName, dispatch]);

	const changeTypeHandler = (e) => {
		dispatch(getChosenType(e.target.value));
	};

	const changeSubtypeHandler = (e) => {
		dispatch(getChosenSubtype(e.target.value.replace(/ /g, '.')));
	};

	return (
		<div className='filter__container'>
			<div className='filter__container-item'>
				<input
					placeholder='Name'
					type='text'
					value={enteredName}
					id='name'
					onChange={(e) => setEnteredName(e.target.value)}
				/>
			</div>
			<div className='filter__container-item'>
				<select value={filterData.chosenType} onChange={changeTypeHandler}>
					<option value=''>All types</option>
					{filterData.types.map((type) => {
						return (
							<option key={type} value={`%20types:${type}`}>
								{type}
							</option>
						);
					})}
				</select>
			</div>
			<div className='filter__container-item'>
				<select
					value={filterData.chosenSubtype.replace(/[.]/g, ' ')}
					onChange={changeSubtypeHandler}
				>
					<option value=''>All subtypes</option>
					{filterData.subtypes.map((subtype) => {
						return (
							<option key={subtype} value={`%20subtypes:${subtype}`}>
								{subtype}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

export default PokemonsFilter;
