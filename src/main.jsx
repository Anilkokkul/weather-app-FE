import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import axios from "axios";
import Dashboard from "./components/Dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Forecast from "./components/Forecast.jsx";
import History from "./components/History.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/forecast/:city",
        element: <Forecast />,
      },
      {
        path: "/history/:city",
        element: <History />,
      },
    ],
  },
]);
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

if (!window._reactRoot) {
  const container = document.getElementById("root");
  window._reactRoot = ReactDOM.createRoot(container);
}

window._reactRoot.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
