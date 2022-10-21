import PropTypes from 'prop-types'

export const LoadingScreen = ({message = 'Cargando'}) => {
  return (
    <div className="loading__content my-5">
      <div className="loading__spineer"></div>
      <p>{message}</p>
    </div>
  )
}

LoadingScreen.propTypes = {
  message: PropTypes.string
}