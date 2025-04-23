import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const PlanetsDetails = () => {
    const { store, dispatch } = useGlobalReducer()
    const { uId } = useParams()

    const fetchPlanet = async () => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/planets/${uId}`);
            if (!response.ok) {
                throw new Error("No se pudieron obtener los datos de una persona");
            }
            const data = await response.json();
            dispatch({
                type: "set_planet",
                payload: data.result.properties
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchPlanet(); // Ejecuto a la función
    }, []);

    return (
        <div>
            <h1 className="text-center">PLANET DETAILS</h1>
            {store.planet ? (
                <div className="person-details-card">
                    <p><strong>Name:</strong> {store.planet.name}</p>
                    <p><strong>Climate:</strong> {store.planet.climate}</p>
                    <p><strong>Diameter:</strong> {store.planet.diameter} km</p>
                    <p><strong>Gravity:</strong> {store.planet.gravity}</p>
                    <p><strong>Terrain:</strong> {store.planet.terrain}</p>
                    <p><strong>Surface Water:</strong> {store.planet.surface_water} %</p>
                    <p><strong>Population:</strong> {store.planet.population}</p>
                    <p><strong>Orbital Period:</strong> {store.planet.orbital_period} days</p>
                    <p><strong>Rotation Period:</strong> {store.planet.rotation_period} hours</p>
                    <p><strong>Created:</strong> {store.planet.created}</p>
                    <p><strong>Edited:</strong> {store.planet.edited}</p>
                </div>
            ) : (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
};

export default PlanetsDetails