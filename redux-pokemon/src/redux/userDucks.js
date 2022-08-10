import { auth, firebase, db, storage } from "../firebase";

const dataInicial = {
  loading: false,
  activo: false,
};

const LOADING = "LOADING";
const USER_EXITO = "USER_EXITO";
const USER_ERROR = "USER_ERROR";
const CERRAR_SESION = "CERRAR_SESION";

export default function userReducer(state = dataInicial, action) {
  switch(action.type){
    case LOADING:
        return {...state, loading: true}
    case USER_ERROR:
        return {...dataInicial}
    case USER_EXITO:
        return {...state, loading: false, user: action.payload, activo: true}
    case CERRAR_SESION:
        return {...dataInicial}
    default:
        return {...state}
}
}

export const ingresoUsuarioAccion = () => async(dispatch) => {
  dispatch({
      type: LOADING
  })
  try {

      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await auth.signInWithPopup(provider)

      console.log(res.user)

      const usuario = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL
      }

      const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()
      console.log(usuarioDB)
      if(usuarioDB.exists){
          // cuando existe el usuario en firestore
          dispatch({
              type: USER_EXITO,
              payload: usuarioDB.data()
          })
          localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
      }else{
          // no existe el usuario en firestore
          await db.collection('usuarios').doc(usuario.email).set(usuario)
          dispatch({
              type: USER_EXITO,
              payload: usuario
          })
          localStorage.setItem('usuario', JSON.stringify(usuario))
      }
      
  } catch (error) {
      console.log(error)
      dispatch({
          type: USER_ERROR 
      })
  }
}

export const leerUsuarioAccion = () => async (dispatch) => {
  if (localStorage.getItem("usuario")) {
    dispatch({
      type: USER_EXITO,
      payload: {
        user: JSON.parse(localStorage.getItem("usuario")),
      },
    });
  }
};

export const cerrarSesionAccion = () => (dispatch) => {
  auth.signOut();
  dispatch({
    type: CERRAR_SESION,
  });
  localStorage.removeItem("usuario");
};

export const actualizarUsuarioAccion = (nombreActualizado) => async (dispatch, getState) => {
  dispatch({
      type: LOADING
  })

  const {user} = getState().usuario
  console.log(user)

  try {
      
      await db.collection('usuarios').doc(user.email).update({
          displayName: nombreActualizado
      })

      const usuario = {
          ...user,
          displayName: nombreActualizado
      }

      dispatch({
          type: USER_EXITO,
          payload: usuario
      })
      localStorage.setItem('usuario', JSON.stringify(usuario))

  } catch (error) {
      console.log(error)
  }
}

export const editarFotoAccion = (imagenEditada) => async(dispatch, getState) => {

  dispatch({
      type: LOADING
  })
  const {user} = getState().usuario

  try {

      const imagenRef = await storage.ref().child(user.email).child('foto perfil')
      await imagenRef.put(imagenEditada)
      const imagenURL = await imagenRef.getDownloadURL()

      await db.collection('usuarios').doc(user.email).update({
          photoURL: imagenURL
      })

      const usuario = {
          ...user,
          photoURL: imagenURL
      }

      dispatch({
          type: USER_EXITO,
          payload: usuario
      })

      localStorage.setItem('usuario', JSON.stringify(usuario))
      
  } catch (error) {
      console.log(error)
  }
}

