import './MainNavigation.scss';
import { NavLink } from 'react-router-dom';
import img1 from '../../images/clipart1298368.jpg';

const MainNavigation = () => {
	return (
		<header className='header'>
			<div className='logo'>
				Pokedex
				<img className='logo-img' src={img1} alt='Pokeball'/>
			</div>
			<nav className='nav'>
				<ul>
					<li>
						<NavLink to='/pokemon' activeClassName='active'>
							Pokemons
						</NavLink>
					</li>
					<li>
						<NavLink to='/favourite' activeClassName='active'>
							Favourites
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
