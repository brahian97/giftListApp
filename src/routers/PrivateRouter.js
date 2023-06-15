import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

export const PrivateRouter = ({component: Component, isLoggedIn}) => {
  return !isLoggedIn ? <Navigate to="/login" replace={true} /> : <Component />
}

PrivateRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}