// import React from 'react'
import "./NavBar_header.css";
import { loadWeb3 } from "../apis/api";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import abort_logo from "../Assets/abort_logo.svg";
import head1 from "../Assets/head1.svg";
import head2 from "../Assets/head2.svg";
import head3 from "../Assets/head3.svg";
import head4 from "../Assets/head4.svg";
import head5 from "../Assets/head5.svg";
import head6 from "../Assets/head6.svg";
import bf from "../Assets/bf.png";

function NavBar_header({ BtTxt }) {
  // const [BtTxt, setBtTxt] = useState("Connect")

  return (
    <div>
      <Navbar collapseOnSelect expand="lg"  variant="dark">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Nav>
              
              
              {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar_header;
