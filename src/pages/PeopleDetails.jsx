import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const PeopleDetails = () => {
    const { store, dispatch } = useGlobalReducer()
    const { uId } = useParams()
    const [isInFavourites, setIsInFavourites] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const fetchPerson = async () => {
        setIsLoading(true)

        try {
            const response = await fetch(`https://www.swapi.tech/api/people/${uId}`);
            if (!response.ok) {
                throw new Error("No se pudieron obtener los datos de una persona");
            }
            const data = await response.json();
            dispatch({
                type: "set_person",
                payload: data.result.properties
            });

            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPerson(); // Ejecuto a la función

        const alreadyInFavorites = store.favorites.some(fav =>
            fav.uid === uId && fav.type === "people"
        );

        setIsInFavourites(alreadyInFavorites)
    }, []);

    const handleAddToFavorites = (e) => {
        e.stopPropagation(); // Previene que se dispare el navigate

        const alreadyInFavorites = store.favorites.some(fav =>
            fav.uid === uId && fav.type === "people"
        );

        if (alreadyInFavorites) {
            alert("Este elemento ya está en favoritos.");
            return;
        }

        setIsInFavourites(!isInFavourites)

        dispatch({
            type: "add_to_favorites",
            payload: {
                name: store.person.name,
                uid: uId,
                type: 'people'
            }
        });
    };

    const handleRemoveFromFavourites = (e) => {
        e.stopPropagation(); // Previene que se dispare el navigate

        const alreadyInFavorites = store.favorites.some(fav =>
            fav.uid === uId && fav.type === "people"
        );
        

        if (!alreadyInFavorites) {
            alert("Este elemento no está en favoritos.");
            return;
        }

        setIsInFavourites(!isInFavourites)

        dispatch({
            type: "remove_from_favorites",
            payload: uId
        });
    };

    if (isLoading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )
    }


    return (
        <div>
            <h1 className="text-center">PERSON DETAILS</h1>
            {store.person ? (
                <div className="person-details-card">
                    <p><strong>Name:</strong> {store.person.name}</p>
                    <p><strong>Gender:</strong> {store.person.gender}</p>
                    <p><strong>Skin Color:</strong> {store.person.skin_color}</p>
                    <p><strong>Hair Color:</strong> {store.person.hair_color}</p>
                    <p><strong>Height:</strong> {store.person.height} cm</p>
                    <p><strong>Eye Color:</strong> {store.person.eye_color}</p>
                    <p><strong>Mass:</strong> {store.person.mass} kg</p>
                    <p><strong>Birth Year:</strong> {store.person.birth_year}</p>
                    {!isInFavourites ? (
                        <button
                            type="button"
                            className="list-group-item bg-success text-white text-center p-1"
                            onClick={handleAddToFavorites}>
                            +Add to Favourites
                        </button>) 
                        : (
                        <button
                            type="button"
                            className="list-group-item bg-danger text-white text-center p-1"
                            onClick={handleRemoveFromFavourites}>
                            - Remove from Favourites
                        </button>
                    )}
                    
                </div>
            ) : (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
};

export default PeopleDetails