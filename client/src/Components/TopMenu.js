import { useLazyQuery } from "@apollo/client"
import React, { useEffect } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { GET_USER_INFO } from "./graphql/user"
import "./TopMenu.css"

const TopMenu = () => {
  const navigate = useNavigate()
  const [userInfo, { client, error, loading, data }] =
    useLazyQuery(GET_USER_INFO)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userInfo()
    } else {
      client.resetStore()
      navigate("/login")
    }
  }, [])

  error && console.error(JSON.stringify(error, null, 2))
  data && console.log(data)

  const logout = () => {
    localStorage.removeItem("token")
    client.resetStore()
    navigate("/login")
  }

  const loggedIn = localStorage.getItem("token")
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Sisu 2.0 </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {loading && data ? (
            <></>
          ) : (
            <>
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
                  <NavDropdown title={data?.getUserInfo.fullName}>
                    <NavDropdown.Item href="#">Asetukset</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logout()}>
                      Kirjaudu ulos
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link className="ms-auto" href="/login">
                  Kirjaudu
                </Nav.Link>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopMenu
