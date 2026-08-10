import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Document from "../pages/Document";
import MainLayout from "../layouts/mainLayout";
import { getDocuments } from "../utils/documentsApi";

async function documentsLoader() {
  return getDocuments();
}

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <MainLayout />,
    loader: documentsLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "docs/:slug",
        element: <Document />,
      },
    ],
  },
]);

export default router;