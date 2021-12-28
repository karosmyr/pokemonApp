import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPokemonDetail } from '../store/pokemon-actions';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import HeartRed from '../iconComponents/HeartRed';
import HeartTransparent from '../iconComponents/HeartTransparent';
import FavButtons from '../components/Pokemons/FavButtons';
import './PokemonDetail.scss';

const PokemonDetail = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const pokeData = useSelector((state) => state.pokemons);

	useEffect(() => {
		dispatch(getPokemonDetail(params.pokemonId));
	}, [dispatch, params.pokemonId]);

	let detailContent;
	if (pokeData.pokemonDetail.length === 1) {
		detailContent = (
			<>
				<div className='detailHeader'>
					<h3 className='detailHeader__heading'>
						{pokeData.pokemonDetail[0].name}
					</h3>
					<div className='detailHeader__logo'>
						{pokeData.favPokemons.find(
							(el) => el.id === pokeData.pokemonDetail[0].id
						) ? (
							<HeartRed />
						) : (
							<HeartTransparent />
						)}
					</div>
					<FavButtons
						id={pokeData.pokemonDetail[0].id}
						className='detailHeader__button'
					/>
				</div>
				<div className='detail'>
					<div className='detail__item detail__item-img'>
						<img
							src={pokeData.pokemonDetail[0].images.large}
							alt={pokeData.pokemonDetail[0].name}
							className='detail__img'
						/>
					</div>
					<div className='detail__item detail__item--start'>
						<p className='detail__item-desc'>ID</p>
						<p className='detail__item-text'>{pokeData.pokemonDetail[0].id}</p>
						<p className='detail__item-desc'>Artist</p>
						<p className='detail__item-text'>{pokeData.pokemonDetail[0].artist}</p>
						<p className='detail__item-desc'>Evolves to</p>
						<p className='detail__item-text'>
							{pokeData.pokemonDetail[0].evolvesTo
								? pokeData.pokemonDetail[0].evolvesTo
								: '-'}
						</p>
						<p className='detail__item-desc'>Type</p>
						<p className='detail__item-text'>
							{pokeData.pokemonDetail[0].types
								? pokeData.pokemonDetail[0].types.join(', ')
								: '-'}
						</p>
						<p className='detail__item-desc'>Subtype</p>
						<p className='detail__item-text'>
							{pokeData.pokemonDetail[0].subtypes.join(', ')}
						</p>
						<p className='detail__item-desc'>HP</p>
						<p className='detail__item-text'>
							{pokeData.pokemonDetail[0].hp ? pokeData.pokemonDetail[0].hp : '-'}
						</p>
						<p className='detail__item-desc'>Facts</p>
						<p className='detail__item-text'>
							{pokeData.pokemonDetail[0].flavorText
								? pokeData.pokemonDetail[0].flavorText
								: '-'}
						</p>
					</div>
				</div>
				<div className='detail__attack'>
					<h3 className='detail__attack-heading'>Attacks:</h3>
					{pokeData.pokemonDetail[0].attacks
						? pokeData.pokemonDetail[0].attacks.map((item, index) => (
								<div className='detail__attack-item' key={index}>
									<p>
										<span className='detail__attack-item--bold'>
											{item.name}-{' '}
										</span>
										{item.text}
									</p>
									<p className='detail__attack-item damage'>
										<span>Damage: </span>
										{item.damage}
									</p>
									<p className='detail__attack-item energy'>
										<span>Energy cost: </span>
										{item.convertedEnergyCost}
									</p>
								</div>
						  ))
						: '-'}
					<h3 className='detail__attack-heading'>Weaknesses:</h3>
					{pokeData.pokemonDetail[0].weaknesses
						? pokeData.pokemonDetail[0].weaknesses.map((item, index) => (
								<div className='detail__attack-item' key={index}>
									<p>
										<span>{item.type} </span>
										{item.value}
									</p>
								</div>
						  ))
						: '-'}
				</div>
			</>
		);
	} else {
		detailContent = <p className='centered'>Something went wrong.</p>;
	}

	return (
		<>
			{pokeData.loading ? (
				<div className='centered'>
					<LoadingSpinner />
				</div>
			) : pokeData.error ? (
				<div className='centered'>
					<p>{pokeData.error}</p>
				</div>
			) : (
				<>{detailContent}</>
			)}
		</>
	);
};

export default PokemonDetail;
