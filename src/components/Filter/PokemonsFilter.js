import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getChosenType,
	getChosenSubtype,
	getChosenName,
} from '../../store/pokeActions';
import './PokemonsFilter.scss';

const PokemonsFilter = () => {
	const dispatch = useDispatch();
	const pokeData = useSelector((state) => state.pokemons);
	const [enteredName, setEnteredName] = useState(pokeData.name);

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
				<select value={pokeData.chosenType} onChange={changeTypeHandler}>
					<option value=''>All types</option>
					{pokeData.types.map((type) => {
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
					value={pokeData.chosenSubtype.replace(/[.]/g, ' ')}
					onChange={changeSubtypeHandler}
				>
					<option value=''>All subtypes</option>
					{pokeData.subtypes.map((subtype) => {
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
