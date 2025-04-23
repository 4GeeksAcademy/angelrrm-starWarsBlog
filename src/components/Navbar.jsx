import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar nav-link-glow">
			<div className="container">
				<Link to="/">
					<img
						src="https://www.cinemascomics.com/wp-content/uploads/2016/12/star-wars-fascismo-1-1.jpg"
						alt="Star Wars Logo"
						className="navbar-logo"
					/>
				</Link>
				
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};