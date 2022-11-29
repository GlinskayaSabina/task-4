import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";

const ToolBar = observer((props) => {
  const {
    selectAll = () => {},
    deleteUsers = () => {},
    blockOrUnblock = () => {},
    logout = () => {},
  } = props;
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Button variant="light" onClick={() => selectAll()}>
          Choose all
        </Button>
        <Nav className="me-auto">
          <Button
            variant="light"
            className="ml-2"
            onClick={() => deleteUsers()}
          >
            Delete
          </Button>
          <Button
            variant="light"
            className="ml-2"
            onClick={() => blockOrUnblock("blocked")}
          >
            Block
          </Button>
          <Button
            variant="light"
            className="ml-2"
            onClick={() => blockOrUnblock("unblocked")}
          >
            Unblock
          </Button>
          <Button variant="light" className="ml-2" onClick={() => logout()}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
});

export default ToolBar;
