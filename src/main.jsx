import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";

/* Pages */
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Attractions from "./pages/Attractions.jsx";
import EventsPage from "./pages/Events.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Reviews from "./pages/Reviews.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

/* NEW SaaS pages */
import Account from "./pages/Account.jsx";
import Success from "./pages/Success.jsx";

/* Components */
import AttractionDetails from "./components/AttractionDetails.jsx";

/* Global Styles */
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      /* Base pages */
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <Services /> },

      /* Attractions */
      { path: "/attractions", element: <Attractions /> },
      { path: "/attractions/:id", element: <AttractionDetails /> },

      /* Events */
      { path: "/events", element: <EventsPage /> },
      { path: "/events/:slug", element: <EventDetails /> },

      /* Reviews + Contact */
      { path: "/reviews", element: <Reviews /> },
      { path: "/contact", element: <Contact /> },

      /* NEW: Stripe SaaS pages */
      { path: "/account", element: <Account /> },
      { path: "/success", element: <Success /> },

      /* Catch-all */
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
