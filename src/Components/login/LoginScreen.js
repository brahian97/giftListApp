import React, { useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { googleLogin, startLoginEmailPassword } from "../../actions/auth"
import { removeError } from "../../actions/ui"
import useForm from "../../hooks/useForm"

export const LoginScreen = () => {

  const dispatch = useDispatch()
  const {isLoading, error} = useSelector(state => state.ui)

  const[{email, password}, handleInputChange] = useForm({
    email: 'brahian97@outlook.com',
    password: 'wasd2020'
  })

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLoginEmailPassword(email, password))
  }

  const handleGoogleLogin = () => {
    dispatch(googleLogin())
  }

  useEffect(() => {
    dispatch(removeError())
  }, [dispatch])

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <div className="mw-75 p-5 border" style={{minWidth: '50vw'}}>
        <h2 className="text-center">Iniciar sesión</h2>
        <Form onSubmit={handleLogin}>
          {
            error &&
            <div className='auth__alert-error'>
              {error}
            </div>
          }
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo</Form.Label>
            <Form.Control name='email' type="email" placeholder="Ingresa tu correo" value={email} onChange={handleInputChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control name='password' type="password" placeholder="Ingresa tu contraseña" value={password} onChange={handleInputChange} />
          </Form.Group>
          <div className='d-flex justify-content-center'>
            <Button variant="primary" type="submit" style={{color: 'white'}} disabled={isLoading} className='btn btn-primary btn-block mt-1'>
              Iniciar sesión
            </Button>
          </div>
          <div className="auth__no-account mt-4 mb-3">
            <p>¿Olvidaste tu contraseña? <Link to='/resetPassword' className='link' >Resetear contraseña</Link> </p>
          </div>
          <hr />
          <div className="auth__social-networks" >
            <p style={{fontWeight: '700'}}>Iniciar sesión de otras formas</p>
            <div className="google-btn" onClick={handleGoogleLogin}>
              <div className="google-icon-wrapper">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
              </div>
              <p className="btn-text">
                <b>Iniciar con google</b>
              </p>
            </div>
          </div>
          <div className="auth__no-account">
            <p>¿No tienes cuenta? <Link to='/register' className='link' >Registrarse</Link> </p>
          </div>
        </Form>
      </div>
    </div>
  )
}