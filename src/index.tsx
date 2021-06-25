import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { AppRouteRootList } from "./pages/routes";
import reportWebVitals from "./reportWebVitals";

const root = document.getElementById("root");
const Application = (
  <StrictMode>
    <BrowserRouter>
      <Switch>
        <>{renderRoutes(AppRouteRootList)}</>
      </Switch>
    </BrowserRouter>
  </StrictMode>
);
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   root
// );
render(Application, root);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
