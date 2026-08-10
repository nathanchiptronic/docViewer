import { Outlet, useLoaderData, useRevalidator } from "react-router-dom";
import Box from "@mui/material/Box";

import Header from "../components/header";
import Sidebar from "../components/Sidebar/sidebar";
import ScrollToHash from "../components/scrollToHash";
import UploadDocument from "../components/UploadDocument/UploadDocument";

export default function MainLayout() {
  const documents = useLoaderData();
  const { revalidate } = useRevalidator();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />

      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar documents={documents} onRefresh={revalidate} />

        <Box
          id="content-scroll"
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            minWidth: 0,
            p: 3,
            scrollBehavior: "smooth",
          }}
        >
          <ScrollToHash />
          <Outlet />
        </Box>

        <UploadDocument onChanged={revalidate} />
      </Box>
    </Box>
  );
}