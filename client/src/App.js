import { observer } from "mobx-react-lite";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import UserStore from "./store/UserStore";

const App = observer(() => {
  return (
    <Context.Provider
      value={{
        user: new UserStore(),
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Context.Provider>
  );
});

export default App;
