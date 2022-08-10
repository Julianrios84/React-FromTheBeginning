import axios from "axios";

// Contantes
const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO";
const POKE_INFO_EXITO = "POKE_INFO_EXITO";
// const ANTERIOR_POKEMONES_EXITO = "ANTERIOR_POKEMONES_EXITO";

// Reducer
export default function pokeReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case SIGUIENTE_POKEMONES_EXITO:
      return {
        ...state,
        ...action.payload,
      };
    case POKE_INFO_EXITO:
      return { ...state, unPokemon: action.payload };
    // case ANTERIOR_POKEMONES_EXITO:
    //     return {
    //       ...state,
    //       ...action.payload,
    //     };
    default:
      return state;
  }
}

// Acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem("offset=0")),
    });
  } else {
    try {
      const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`
      );
      dispatch({
        type: OBTENER_POKEMONES_EXITO,
        payload: res.data,
      });
      localStorage.setItem("offset=0", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};

export const siguientePokemonAccion = () => async (dispatch, getState) => {
  const { next } = getState().pokemones;
  if (localStorage.getItem(next)) {
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(next)),
    });
  } else {
    try {
      const res = await axios.get(next);
      dispatch({
        type: SIGUIENTE_POKEMONES_EXITO,
        payload: res.data,
      });
      localStorage.setItem(next, JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};

export const anteriorPokemonAccion = () => async (dispatch, getState) => {
  const { previous } = getState().pokemones;
  if (localStorage.getItem(previous)) {
    console.log("existe");
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(previous)),
    });
  } else {
    try {
      const res = await axios.get(previous);
      dispatch({
        type: SIGUIENTE_POKEMONES_EXITO,
        payload: res.data,
      });
      localStorage.setItem(previous, JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};

export const unPokeDetalleAccion = ( url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch, getState) => {
  
  if(localStorage.getItem(url)){
      dispatch({
          type: POKE_INFO_EXITO,
          payload: JSON.parse(localStorage.getItem(url))
      })
      return
  }
  try {
      const res = await axios.get(url)
      // console.log(res.data)
      dispatch({
          type: POKE_INFO_EXITO,
          payload: {
              nombre: res.data.name,
              foto: res.data.sprites.front_default,
              alto: res.data.height,
              ancho: res.data.weight
          }
      })
      localStorage.setItem(url, JSON.stringify({
          nombre: res.data.name,
          foto: res.data.sprites.front_default,
          alto: res.data.height,
          ancho: res.data.weight
      }))

  } catch (error) {
      console.log(error.response)
  }
}
