export const initialStore = () => {
  return {
    message: null,
    people: [],
    vehicles: [],
    planets: [],
    person: {},
    favorites: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'set_people':
      return {
        ...store,
        people: action.payload,
      };

    case 'set_person':
      return {
        ...store,
        person: action.payload,
      };

    case 'set_vehicles':
      return {
        ...store,
        vehicles: action.payload,
      };
    case 'set_vehicle':
      return {
        ...store,
        vehicle: action.payload,
      };
    case 'set_planets':
      return {
        ...store,
        planets: action.payload,
      };
    case 'set_planet':
      return {
        ...store,
        planet: action.payload,
      };

    case 'add_to_favorites':
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'remove_from_favorites':
      return {
        ...store,
        favorites: store.favorites.filter((favorite) => favorite.uid !== action.payload)
        // El método filter nos devuelve un nuevo array de resultados, o sea en este caso nos devuelve todos los favoritos que el uid no coincida con el payload que le mandamos (o sea que en el payload le tenemos que mandar el uid que queremos borrar)
      }

    default:
      throw Error('Unknown action.');
  }
}
