import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const click = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        let data;
        if (isLogin) {
          data = await login(email, password);
        } else {
          data = await registration(email, password, name);
        }
        user.setUser(data);
        user.setIsAuth(true);
        history.push(HOME_ROUTE);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Login" : "Registration"}</h2>
        <Form onSubmit={click} className="d-flex flex-column">
          <Form.Control
            type="email"
            className="mt-3"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                No account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
              </div>
            ) : (
              <>
                <Form.Control
                  className="mt-3"
                  placeholder="Enter name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div>
                  Have an account?<NavLink to={LOGIN_ROUTE}>Login!</NavLink>
                </div>
              </>
            )}
            <Button type="submit" variant={"outline-success"}>
              {isLogin ? "Login" : "Registration"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
