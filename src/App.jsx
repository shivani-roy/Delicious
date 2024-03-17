import Pages from "./pages/Pages";
import Cuisine from "./pages/Cuisine";
import Home from "./pages/HomeLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Searched from "./pages/Searched";
import ErrorPage from "./pages/ErrorPage";
import Recipe from "./pages/Recipe";
import { AnimatePresence } from "framer-motion";
import SimilarRecipes from "./pages/SimilarRecipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AnimatePresence mode="wait">
        <Pages />
      </AnimatePresence>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cuisine/:type",
        element: <Cuisine />,
      },
      {
        path: "/searched/:search",
        element: <Searched />,
      },
      {
        path: "/recipe/:id",
        element: <Recipe />,
      },
      {
        path: "/recipe/:id/similar",
        element: <SimilarRecipes />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
