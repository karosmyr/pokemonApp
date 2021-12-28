import './Layout.scss';
import MainNavigation from './MainNavigation';

const Layout = (props) => {
	return (
		<>
			<MainNavigation />
			<main className='main'>{props.children}</main>
		</>
	);
};

export default Layout;
