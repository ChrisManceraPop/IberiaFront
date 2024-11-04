import React from "react";
import Login from "../views/login";
import RedireccionarALanding from "./RedireccionarALanding";
import Invoices from "../views/Invoices";

const route = [
    //Sistema
    { path: '/Ingresar/Factura', element: React.createElement(Invoices), exact: true },
    { path: '/', element: React.createElement(Login), exact: true },
    { path: '*', element: React.createElement(RedireccionarALanding), exact: false },
  ];
  
  export default route;