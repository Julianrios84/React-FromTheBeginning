import React from 'react';

const Saludo = (props) => {
  return (
    <div>
      <h2>Saludo a {props.persona}</h2>
      <p>Eadd: {props.edad}</p>
    </div>
  )
}

export default Saludo