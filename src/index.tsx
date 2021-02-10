import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";

import { WatchContextContainer } from "components/WatchContext";
import "normalize.css";
import "./styles/global.scss";
import { ToastContainer } from "components/common/Toast";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <ToastContainer>
        <WatchContextContainer>
          <App />
        </WatchContextContainer>
      </ToastContainer>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register({
  onUpdate: () => {
    setTimeout(() => window.dispatchEvent(new Event("sw-updated")), 1000);
  },
});
