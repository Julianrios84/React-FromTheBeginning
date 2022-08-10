import React from 'react'
import Chat from './components/Chat';

import Navbar from './components/Navbar'

import { ChatContext } from './context/ChatProvider'

function App() {

  const { usuario } = React.useContext(ChatContext)

  return usuario !== null ? (
    <div>
      <Navbar />
      {
        usuario.activo ? (
          <Chat />
        ): (
          <div className="lead text-center mt-5">
            Debes iniciar sessión
          </div>
        )
      } 
    </div>
  ): (
    <div>Cargando</div>
  );
}

export default App;
