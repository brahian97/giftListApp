import { useRouteError } from "react-router-dom"

export const ErrorPage = () => {

  const error = useRouteError()

  return <div>{error.message}</div>
}