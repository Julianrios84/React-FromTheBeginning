import React from "react";

// hooks react redux
import { useDispatch, useSelector } from "react-redux";

// importamos la acción
import {
  obtenerPokemonesAccion,
  siguientePokemonAccion,
  anteriorPokemonAccion
} from "../redux/pokeDucks";

import Detalle from './Detalle'

const Pokemones = () => {
  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  // crearmos el state utilizando nuestra tienda
  // store.pokemones lo sacamos de la tienda
  const pokemones = useSelector((store) => store.pokemones.results);
  const next = useSelector((store) => store.pokemones.next);
  const previous = useSelector((store) => store.pokemones.previous);

  return (
    <div className="row">
      <div className="col-md-6">
        <h3>Pokemones!</h3>
        <ul className="list-group mt-4">
          {pokemones.map((item) => (
            <li className="list-group-item" key={item.name}>
            {item.name}
            <button className="btn btn-dark btn-sm float-right">info</button>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between mt-3">
        {pokemones.length === 0 && (
          <button className="btn btn-dark" onClick={() => dispatch(obtenerPokemonesAccion())}>
            Get Pokemones
          </button>
        )}
        {next && (
          <button className="btn btn-dark" onClick={() => dispatch(siguientePokemonAccion())}>
            Siguiente
          </button>
        )}
        {previous && (
          <button className="btn btn-dark" onClick={() => dispatch(anteriorPokemonAccion())}>
            Anterior
          </button>
        )}
        </div>
      </div>
      <div className="col-mg-6">
        <h3>Detalle</h3>
        <Detalle></Detalle>
      </div>
    </div>
  );
};

export default Pokemones;
