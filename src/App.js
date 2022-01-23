import React, { Fragment } from "react";
import Loadable from "react-loadable";
import { useSelector } from "react-redux";
import "./App.css";
import Backdrop from "./components/backdrop/backdrop";
import ErrorBoundary from "./components/error";
import Loader from "./components/loader/loader";

const HomeScreen = Loadable({
  loader: () => import("./screens/HomeScreen"),
  loading() {
    return <Loader />;
  },
});
const NavBar = Loadable({
  loader: () => import("./components/navigation"),
  loading() {
    return <div></div>;
  },
});

function App() {
  const backdropState = useSelector((state) => state.backdrop);
  const { backdrop } = backdropState;

  return (
    <Fragment>
      <NavBar />
      {backdrop && <Backdrop />}
      <main>
        <ErrorBoundary>
          <HomeScreen />
        </ErrorBoundary>
      </main>
    </Fragment>
  );
}

export default App;
