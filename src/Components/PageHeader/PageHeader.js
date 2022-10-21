import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { logout } from "../../actions/auth"

export const PageHeader = () => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg='primary' expand="lg" className="px-5">
      <Navbar.Brand href="/" className="d-flex justify-content-center align-items-center text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-box2-heart" viewBox="0 0 16 16">
          <path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982Z"/>
          <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5Zm0 1H7.5v3h-6l2.25-3ZM8.5 4V1h3.75l2.25 3h-6ZM15 5v10H1V5h14Z"/>
        </svg>
        <h1 className="text-secondary ps-2" style={{fontSize: '2rem'}}>Gift List</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex justify-content-center align-items-center">
          <Nav.Link href="/home" className="text-secondary">Mis listas</Nav.Link>
          <Nav.Link href="/home" className="text-secondary">Favoritos</Nav.Link>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>Cerrar sesión</Tooltip>}>
            <Navbar.Brand href="/home" className="text-secondary" onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </Navbar.Brand>
          </OverlayTrigger>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}