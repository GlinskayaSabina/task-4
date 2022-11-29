import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { check } from "../http/userAPI";
import { Context } from "../index";
import { authRoutes } from "../routes";
import { publicRoutes } from "../routes";
import { LOGIN_ROUTE } from "../utils/consts";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  const checkAuthorization = async () => {
    try {
      const data = await check();
      if (data) {
        user.setUser(data);
        user.setIsAuth(true);
        history.push("/home");
      }
    } catch (err) {
      console.warn("Your token was expired");
    }
  };

  useEffect(() => {
    checkAuthorization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      {user._IsAuth === true &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
});

export default AppRouter;
