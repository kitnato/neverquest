import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
// import reportWebVitals from "./reportWebVitals";

import App from "pages/App";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
