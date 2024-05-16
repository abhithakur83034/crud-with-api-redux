import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const index = () => {
  return (
    <div>
    <Navbar className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand as={Link} to="/">Navbar with text</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Nav>
      <Nav as={Link} to="/user">User</Nav>
      <Nav as={Link} to="/product">Product</Nav>
    </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    </div>
  )
}

export default index
