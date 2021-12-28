import { Link } from 'react-router-dom';
import FavButtons from './FavButtons';
import './PokemonItem.scss';

const PokemonItem = (props) => {
	return (
		<li className='item'>
			<div className='item__img'>
				<img className='item__img-img' src={props.image} alt={props.name} />
				<div className='item__overlay'>
					<Link className='link' to={`/pokemon/${props.id}`}>
						<button className='item__overlay-details'>MORE DETAILS</button>
					</Link>
					<FavButtons id={props.id} className='item__overlay-details' />
				</div>
			</div>
		</li>
	);
};

export default PokemonItem;
