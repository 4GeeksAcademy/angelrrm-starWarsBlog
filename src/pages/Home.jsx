import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();

	const fetchPeople = async () => {
		try {
			const response = await fetch("https://www.swapi.tech/api/people/")

			// 👉 Verificamos si la petición fue exitosa
			if (!response.ok) {
				throw new Error("¡Vaya! No hemos podido obtener los personajes");
			}

			// 👉 Convertimos la respuesta a JSON
			const data = await response.json();

			dispatch({
				type: "set_people",
				payload: data.results
			})


		} catch (error) {
			console.log(error)
		}
	};

	const fetchVehicles = async () => {
		try {
			const response = await fetch("https://www.swapi.tech/api/vehicles/");
			if (!response.ok) {
				throw new Error("No se pudieron obtener los vehículos");
			}
			const data = await response.json();
			dispatch({
				type: "set_vehicles",
				payload: data.results
			});
		} catch (error) {
			console.log(error);
		}
	};

	const fetchPlanets = async () => {
		try {
			const response = await fetch("https://www.swapi.tech/api/planets/");
			if (!response.ok) {
				throw new Error("No se pudieron obtener los planetas");
			}
			const data = await response.json();
			dispatch({
				type: "set_planets",
				payload: data.results
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPeople(); // Ejecuto a la función
		fetchVehicles();
		fetchPlanets();

	}, []);

	function peopleExist() {
		if (store.people.length === 0) {
			return (
				<h2>No se han encontrado personajes</h2>
			)
		}
		const scrollLeft = (id) => {
			document.getElementById(id).scrollLeft -= 500;
		};

		const scrollRight = (id) => {
			document.getElementById(id).scrollLeft += 500;
		};
		return (
			store.people.map((person, index) => {
				return (
					<ContactCard
						peopleName={person.name}
						uId={person.uid}
						type="people"
					/>
				)
			})
		)
	}

	function vehiclesExist() {
		if (store.vehicles.length === 0) {
			return (
				<h2>No se han encontrado vehículos</h2>
			)
		}

		return (
			store.vehicles.map((vehicle, index) => {
				return (
					<ContactCard
						peopleName={vehicle.name} // reutilizamos la misma prop para mostrar el nombre
						uId={vehicle.uid}
						type="vehicles"
					/>
				)
			})
		)
	}

	function planetsExist() {
		if (store.planets.length === 0) {
			return (
				<h2>No se han encontrado planetas</h2>
			)
		}

		return (
			store.planets.map((planet, index) => {
				return (
					<ContactCard
						peopleName={planet.name} // usamos la misma prop para mostrar el nombre del planeta
						uId={planet.uid}
						type="planets"
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

		<div className="text-center mt-5">

			<h2 className="section-title">People</h2>
			<div className="scroll-wrapper position-relative">
				<button className="scroll-btn left" onClick={() => scrollLeft('people-scroll')}>‹</button>
				<div className="scroll-container" id="people-scroll">
					{peopleExist()}
				</div>
				<button className="scroll-btn right" onClick={() => scrollRight('people-scroll')}>›</button>
			</div>

			<h2 className="section-title">Vehicles</h2>
			<div className="scroll-wrapper position-relative">
				<button className="scroll-btn left" onClick={() => scrollLeft('vehicles-scroll')}>‹</button>

				<div className="scroll-container" id="vehicles-scroll">
					{vehiclesExist()}
				</div>

				<button className="scroll-btn right" onClick={() => scrollRight('vehicles-scroll')}>›</button>
			</div>

			<h2 className="section-title">Planets</h2>
			<div className="scroll-wrapper position-relative">
				<button className="scroll-btn left" onClick={() => scrollLeft('planets-scroll')}>‹</button>

				<div className="scroll-container" id="planets-scroll">
					{planetsExist()}
				</div>

				<button className="scroll-btn right" onClick={() => scrollRight('planets-scroll')}>›</button>
			</div>
		</div>


	);

};

