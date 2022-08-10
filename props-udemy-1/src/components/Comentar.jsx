import React from 'react'
import Imagen from './Imagen.jsx'

const Comentar = (props) => {
  return (
    <div className="media mt-3">
      <Imagen urlImagen={props.urlImagen} />
      <div className="media-body">
        <h5 className="mt-0">{props.persona}</h5>
        {props.texto}
      </div>
    </div>
  )
}

export default Comentar
