import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Document from "../pages/Document";
import MainLayout from "../layouts/mainLayout";
import { getDocuments, getDocument } from "../documents/documentsApi";
import NotFound from "../pages/NotFound";

async function documentsLoader() {
  return getDocuments();
}

async function documentLoader({ params }) {
  return getDocument(params.slug);
}

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <MainLayout />,
    loader: documentsLoader,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "docs/:slug",
        loader: documentLoader,
        element: <Document />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

export default router;