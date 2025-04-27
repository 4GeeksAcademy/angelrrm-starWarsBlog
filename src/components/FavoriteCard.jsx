import React from 'react'
import { useNavigate } from 'react-router-dom'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

function FavoritesCard(props) {
  const navigate = useNavigate()
  const {store, dispatch} = useGlobalReducer()

  const handleRemoveFromFavourites = (e) => {
    e.stopPropagation(); // Previene que se dispare el navigate

    const alreadyInFavorites = store.favorites.some(fav =>
      fav.uid === props.uId && fav.type === props.type
    );

    if (!alreadyInFavorites) {
      alert("Este elemento no está en favoritos.");
      return;
    }

    dispatch({
      type: "remove_from_favorites",
      payload: props.uId
    });
  };

  return (
    <div
      className="card contact-card text-white bg-dark border-secondary"
      
    >
      <div className="card-body p-2 d-flex flex-column justify-content-between">
        <h5 className="card-title text-center mb-2">{props.itemName}</h5>
        <ul className="list-group d-flex list-group-flush">
          <li
            type="button"
            className="list-group-item bg-warning text-white text-center p-1"
            onClick={() => { navigate(`/${props.type}/${props.uId}`) }}
          >
            Read more
          </li>
          <li
            type="button"
            className="list-group-item bg-danger text-white text-center p-1"
            onClick={handleRemoveFromFavourites}
          >
            - Remove from Favourites
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FavoritesCard