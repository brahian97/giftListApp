import { Link } from "react-router-dom"

export const Page404 = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100">
      <h1 className="">404</h1>
      <h4>Página no encontrada</h4>
      <p>No se encontró lo que buscabas</p>
      <Link to='/home' className="btn btn-primary">Ir al inicio</Link>
    </div>
  )
}