import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const PeopleDetails = () => {
    const { store, dispatch } = useGlobalReducer()
    const { uId } = useParams()

    const fetchPerson = async () => {
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
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchPerson(); // Ejecuto a la función
    }, []);

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
                    <button>+Add to Favorits</button>
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