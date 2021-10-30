import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap';
import './NavMenu.css';

const NavMenu: React.FunctionComponent = () => {
  return (
    <header>
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Secret Agency</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link className="text-dark">Home</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;