import React from 'react'
import { firebase } from './firebase'

function App() {

  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')

  React.useEffect(() => {

    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        const array = await data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setTareas(array)

      }catch(error) {
        console.log(error)
      }
    }

    obtenerDatos();

  }, [])

  const agregar = async (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('sin texto')
      return
    }
    
    try {
      const db = firebase.firestore()
      const nuevaTarea = {
          name: tarea,
          fecha: Date.now()
      }
      const data = await db.collection('tareas').add({
          name: tarea,
          fecha: Date.now()
      })
      setTareas([
          ...tareas,
          {id: data.id, ...nuevaTarea }
      ])
      setTarea('')
    } catch (error) {
        console.log(error)
    }
  }


  const eliminar = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).delete()
      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)
    } catch (error) {
      console.log(error)
    }
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('vacio')
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).update({
        name: tarea
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? {id: item.id, fecha: item.fecha, name: tarea} : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setId('')
      setTarea('')
    } catch (error) {
      console.log(error)
    }
}

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                {item.name}
                <button className="btn btn-danger btn-sm float-right" onClick={() => eliminar(item.id)}>Elimina</button>
                <button className="btn btn-warning btn-sm float-right mr-2" onClick={() => activarEdicion(item)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6 mt-sm-3">
        <h3>{ modoEdicion ? 'Editar Tarea' : 'Agregar Tarea' }</h3>
        <form onSubmit={modoEdicion ? editar : agregar}>
          <input type="text" className="form-control mb-2" placeholder='Ingrese Tarea' value={tarea} onChange={e => setTarea(e.target.value)}/>
          <button type='submit' className={ modoEdicion ? 'btn btn-warning btn-block btn-sm' : 'btn btn-dark btn-block btn-sm' } >
            { modoEdicion ? 'Editar' : 'Agregar' }
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
