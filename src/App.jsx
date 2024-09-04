import { useState } from "react";
import "./App.css";
import RewardsSummary from "./components/RewardsSummary";
import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import ErrorPage from "./components/ErrorPage";

library.add(fas, faTwitter, faFontAwesome);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/rewards",
          element: <RewardsSummary />,
        },
        {
          path: "/dashboard",
          element: <ErrorPage />,
        },
        {
          path: "/repair-stations",
          element: <ErrorPage />,
        },
        {
          path: "/book-repair",
          element: <ErrorPage />,
        },
        {
          path: "/appointment",
          element: <ErrorPage />,
        },
        {
          path: "/my-vehicles",
          element: <ErrorPage />,
        },
        {
          path: "/repair-history",
          element: <ErrorPage />,
        },
        {
          path: "/newsletter",
          element: <ErrorPage />,
        },
        {
          path: "/support",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
