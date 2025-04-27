// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import ContactCard from "../components/FavoriteCard";
import FavoritesCard from "../components/FavoriteCard";

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

	function FavouritesExist() {
		if (store.favorites.length === 0) {
			return (
				<h2>No se han encontrado Favoritos</h2>
			)
		}

		return (
			store.favorites.map((favorite, index) => {
				return (
					<FavoritesCard
					key={index}
					itemName={favorite.name}
					uId={favorite.uid}
					type={favorite.type}
					/>
				)
			})
		)
	}

	const scrollLeft = (id) => {
		const el = document.getElementById(id);
		if (el) el.scrollLeft -= 300;
	};

	const scrollRight = (id) => {
		const el = document.getElementById(id);
		if (el) el.scrollLeft += 300;
	};
	
  return (
	
    <div className="container">
      <br />
	  <h2 className="section-title text-center text-white mt-4">Favorites</h2>
  <div className="scroll-wrapper position-relative">
  <button className="scroll-btn left" onClick={() => scrollLeft('favorites-scroll')}>‹</button>
    <div className="scroll-container" id="favorites-scroll">
      {FavouritesExist()}
	  <button className="scroll-btn right" onClick={() => scrollRight('favorites-scroll')}>›</button>
    </div>
  </div>
    </div>
  );
};
