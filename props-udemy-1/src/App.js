import React from 'react';
import Saludo from './components/Saludo.jsx'
import Comentar from './components/Comentar.jsx'

function App() {
  return (
    <div className="container mt-5">
      <h1>Projecto desde cero</h1>
      <Saludo persona="Ignacio" edad="19" />
      <Saludo persona="Juanito" edad="25" />
      <Saludo persona="Pedrito" edad="40" />
      <hr />
      <h3>Cajita de comentarios</h3>
      <Comentar urlImagen="https://picsum.photos/64" persona="Ignacio" texto="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, autem." />
      <Comentar urlImagen="https://picsum.photos/64" persona="Juanito" texto="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, autem." />
      <Comentar urlImagen="https://picsum.photos/64" persona="Pedrito" texto="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, autem." />
    </div>
  );
}

export default App;
