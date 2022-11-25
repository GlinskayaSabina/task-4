import React, { useContext } from "react";
import { Context } from "../index";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Button variant="light">Choose all</Button>
        <Nav className="me-auto">
          <Button variant="light" className="ml-2">
            Delete
          </Button>
          <Button variant="light" className="ml-2">
            Block
          </Button>
          <Button variant="light" className="ml-2">
            Unblock
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
