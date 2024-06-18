import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Root from "./root";

import HomePage from "./pages/HomePage";
import GptPage from "./pages/GptPage";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TtStreamWatcherPage from "./pages/TtStreamWatcherPage";
import DyStreamWatcherPage from "./pages/DyStreamWatcherPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/gpt",
        element: <GptPage />,
      },
      {
        path: "/tt-stream-watch",
        element: <TtStreamWatcherPage />,
      },
      {
        path: "/dy-stream-watch",
        element: <DyStreamWatcherPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
