// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import ContactCard from "../components/FavoriteCard";
import FavoritesCard from "../components/FavoriteCard";

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

	function FavoiritesExist() {
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
					peopleName={favorite.name}
					uId={favorite.uid}
					type={favorite.type}
					/>
				)
			})
		)
	}
  return (
	
    <div className="container">
      <br />
      <Link to="/">
        <button className="btn btn-danger glowing-button">Back home</button>
      </Link>
	  <h2 className="section-title text-center text-white mt-4">Favorites</h2>
  <div className="scroll-wrapper position-relative">
    <div className="scroll-container" id="favorites-scroll">
      {FavoiritesExist()}
    </div>
  </div>
    </div>
  );
};
