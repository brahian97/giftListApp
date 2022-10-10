import React, { useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { registerWithEmail } from "../../actions/auth"
import { removeError, setError } from "../../actions/ui"
import isEmail from 'validator/lib/isEmail';
import useForm from "../../hooks/useForm"

export const RegisterScreen = () => {

  const dispatch = useDispatch()
  const {isLoading, error} = useSelector(state => state.ui)

  const[{name, email, password, password2}, handleInputChange] = useForm({
    name: 'brahian',
    email: 'brahian97@outlook.com',
    password: 'wasd2020',
    password2: 'wasd2020'
  })

  const handleRegister = (e) => {
    e.preventDefault()
    if(isFormValid()) {
        dispatch(registerWithEmail(email, password, name))
    }
  }

  const isFormValid = () => {
    if(name.trim().lenght === 0) {
      dispatch(setError('register/name-empty'))
      return false
    } else if(!isEmail(email)) {
      dispatch(setError('register/email-invalid'))
      return false
    } else if(password !== password2) {
      dispatch(setError('register/password-wrong'))
      return false
    } else if(password.length < 5) {
      dispatch(setError('register/password-short'))
      return false
    }

    dispatch(removeError())
    return true
  }

  useEffect(() => {
    dispatch(removeError())
  }, [dispatch])

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <div className="mw-75 p-5 border" style={{minWidth: '50vw'}}>
        <h2 className="text-center">Registrarse</h2>
        <Form onSubmit={handleRegister}>
          {
            error &&
            <div className='auth__alert-error'>
              {error}
            </div>
          }
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name='name' type="text" placeholder="Ingresa tu nombre" value={name} onChange={handleInputChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo</Form.Label>
            <Form.Control name='email' type="email" placeholder="Ingresa tu correo" value={email} onChange={handleInputChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control name='password' type="password" placeholder="Ingresa tu contraseña" value={password} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword2">
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control name='password2' type="password" placeholder="Repite tu contraseña" value={password2} onChange={handleInputChange} />
          </Form.Group>
          <div className='d-flex justify-content-center'>
            <Button variant="primary" type="submit" style={{color: 'white'}} disabled={isLoading} className='btn btn-primary btn-block mt-1'>
              Registrarse
            </Button>
          </div>
          <div className="auth__no-account pt-2">
            <p>¿Ya tienes cuenta? <Link to='/login' className='link' >Iniciar sesión</Link> </p>
          </div>
        </Form>
      </div>
    </div>
  )
}