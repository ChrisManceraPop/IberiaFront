import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/home";
import route from "./utilis/route-config";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {route.map((rout) => (
            <Route
              key={rout.path}
              path={rout.path}
              element={<Home content={rout.element} />}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
