import React, { Fragment } from "react";
import Loadable from "react-loadable";
import { useSelector } from "react-redux";
import "./App.css";
import Backdrop from "./components/backdrop/backdrop";

const HomeScreen = Loadable({
  loader: () => import("./screens/HomeScreen"),
  loading() {
    return <div>Loading...</div>
  }
});
const NavBar = Loadable({
  loader: () => import("./components/navigation"),
  loading() {
    return <div></div>
  }
});
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
