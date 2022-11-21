import React from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import "./TopMenu.css"

const TopMenu = () => {
  const loggedIn = true
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Sisu 2.0 </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {loggedIn ? (
            <>
              <Nav className="me-auto">
                <Nav.Link eventKey="study-structure" href="#">
                  Opintojen rakenne
                </Nav.Link>
                <Nav.Link eventKey="profile" href="#">
                  Omat tiedot
                </Nav.Link>
                <Nav.Link eventKey="course-search" href="/search">
                  Kurssihaku
                </Nav.Link>
              </Nav>
              <NavDropdown title="Lassi Knuuttila">
                <NavDropdown.Item href="#">Asetukset</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">
                  Kirjaudu ulos
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav.Link className="ms-auto" href="/login">
              Kirjaudu
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopMenu
