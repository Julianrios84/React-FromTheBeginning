import React from "react";

// hooks react redux
import { useDispatch, useSelector } from "react-redux";

// importamos la acción
import { unPokeDetalleAccion } from "../redux/pokeDucks";

const Detalle = () => {
  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(unPokeDetalleAccion());
    };
    obtenerInfo();
  }, [dispatch]);

  // store.pokemones lo sacamos de la tienda
  const pokemon = useSelector((store) => store.pokemones.unPokemon);

  return pokemon ? (
    <div className="card text-center text-uppercase">
      <div className="card-body">
        <img className="img-fluid" alt="" src={pokemon.foto} />
        <div className="card-title">{pokemon.nombre}</div>
        <p className="card-text">
          Alto: {pokemon.alto} - Ancho: {pokemon.ancho}
        </p>
      </div>
    </div>
  ) : null;
};

export default Detalle;
