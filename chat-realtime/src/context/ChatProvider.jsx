import React from "react";
import { db, auth, provider } from "../firebase";

export const ChatContext = React.createContext();

const ChatProvider = (props) => {
  const dataUsuario = { uid: null, email: null, activo: null };
  const [usuario, setUsuario] = React.useState(dataUsuario);
  const [mensajes, setMensajes] = React.useState([]);

  React.useEffect(() => {
    detectarUsuario();
  }, []);

  const detectarUsuario = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario({
          email: user.email,
          uid: user.uid,
          activo: true,
        });
        cargarMensajes();
      } else {
        // console.log(userChange)
        setUsuario({ email: null, uid: null, activo: false });
      }
    });
  };

  const iniciarSesion = async () => {
    try {
      const res = await auth.signInWithPopup(provider);
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesion = () => {
    auth.signOut();
  };

  const cargarMensajes = () => {
    db.collection("messages")
      .orderBy("fecha")
      .onSnapshot((query) => {
        const arrayMensajes = query.docs.map((item) => item.data());
        setMensajes(arrayMensajes);
      });
  };

  const agregarMensaje = async (uid, texto) => {
    try {
      await db.collection("messages").add({
        uid: uid,
        texto: texto,
        fecha: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{ usuario, iniciarSesion, cerrarSesion, mensajes, agregarMensaje }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
