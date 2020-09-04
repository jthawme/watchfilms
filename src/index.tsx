import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";

import { WatchContextContainer } from "components/WatchContext";
import "normalize.css";
import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <WatchContextContainer>
      <App />
    </WatchContextContainer>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
