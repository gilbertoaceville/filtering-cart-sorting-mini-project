import loadable from "@loadable/component";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Backdrop from "./components/backdrop/backdrop";
import HomeScreen from "./screens/HomeScreen";

const NavBar = loadable(()=> import("./components/navigation"));
function App() {
  const backdropState = useSelector((state) => state.backdrop);
  const { backdrop } = backdropState;

  return (
    <Fragment>
      <NavBar />
      {backdrop && <Backdrop />}
      <main>
        <HomeScreen />
      </main>
    </Fragment>
  );
}

export default App;
