import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const VehiclesDetails = () => {
    const { store, dispatch } = useGlobalReducer()
    const { uId } = useParams()

    const fetchVehicle = async () => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/vehicles/${uId}`);
            if (!response.ok) {
                throw new Error("No se pudieron obtener los datos de una persona");
            }
            const data = await response.json();
            dispatch({
                type: "set_vehicle",
                payload: data.result.properties
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchVehicle(); // Ejecuto a la función
    }, []);

    return (
        <div>
            <h1 className="text-center">VEHICLE DETAILS</h1>
            {store.vehicle ? (
                <div className="person-details-card">
                    <p><strong>Name:</strong> {store.vehicle.name}</p>
                    <p><strong>Model:</strong> {store.vehicle.model}</p>
                    <p><strong>Vehicle Class:</strong> {store.vehicle.vehicle_class}</p>
                    <p><strong>Manufacturer:</strong> {store.vehicle.manufacturer}</p>
                    <p><strong>Length:</strong> {store.vehicle.length} m</p>
                    <p><strong>Crew:</strong> {store.vehicle.crew}</p>
                    <p><strong>Passengers:</strong> {store.vehicle.passengers}</p>
                    <p><strong>Cargo Capacity:</strong> {store.vehicle.cargo_capacity} kg</p>
                    <p><strong>Consumables:</strong> {store.vehicle.consumables}</p>
                    <p><strong>Max Atmosphering Speed:</strong> {store.vehicle.max_atmosphering_speed} km/h</p>
                    <p><strong>Cost in Credits:</strong> {store.vehicle.cost_in_credits}</p>
                    <p><strong>Created:</strong> {store.vehicle.created}</p>
                    <p><strong>Edited:</strong> {store.vehicle.edited}</p>
                </div>
            ) : (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
};

export default VehiclesDetails