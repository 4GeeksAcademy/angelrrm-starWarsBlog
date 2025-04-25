import React from 'react'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from 'react-router-dom'

function ContactCard(props) {
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()

  // ✅ Función que maneja el click en "Add to favorite"
  const handleAddToFavorites = (e) => {
    e.stopPropagation(); // Previene que se dispare el navigate

    const alreadyInFavorites = store.favorites.some(fav =>
      fav.uid === props.uId && fav.type === props.type
    );

    if (alreadyInFavorites) {
      alert("Este elemento ya está en favoritos.");
      return;
    }

    dispatch({
      type: "add_to_favorites",
      payload: {
        name: props.peopleName,
        uid: props.uId,
        type: props.type
      }
    });
  };

  return (
    <div
      className="card contact-card text-white bg-dark border-secondary"
      onClick={() => { navigate(`/${props.type}/${props.uId}`) }}
    >
      <div className="card-body p-2 d-flex flex-column justify-content-between">
        <h5 className="card-title text-center mb-2">{props.peopleName}</h5>
        <ul className="list-group list-group-flush">
          <li
            type="button"
            className="list-group-item bg-danger text-white text-center p-1"
            onClick={handleAddToFavorites}
          >
            + Add to favorite
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ContactCard