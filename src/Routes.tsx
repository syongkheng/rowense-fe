import { createBrowserRouter } from "react-router-dom";

import Root from "./root";
import * as Page from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Page.Error />,
    children: [
      {
        index: true,
        element: <Page.Landing />,
      },
      {
        path: "/login",
        element: <Page.Login />
      },
      {
        path: "/register",
        element: <Page.Register />
      },
      {
        path: "/home",
        element: <Page.Home />
      },
      {
        path: "/gpt",
        element: <Page.Gpt />,
      },
      {
        path: "/tt-stream-watch",
        element: <Page.TtStreamWatcher />,
      },
      {
        path: "/dy-stream-watch",
        element: <Page.DyStreamWatcher />,
      },
    ],
  },
]);