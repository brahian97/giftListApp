import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

export const PublicRouter = ({component: Component, isLoggedIn}) => {
  return isLoggedIn ? <Navigate to="/" replace={true} /> : <Component />
}

PublicRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}