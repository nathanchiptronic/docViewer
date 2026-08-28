import { Outlet, useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";

import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import ScrollToHash from "../components/shared/ScrollToHash";
import AskAI from "../components/layout/AskAI/AskAI";
import { useState } from "react";

export default function MainLayout() {
  const documents = useLoaderData();
  const [askOpen, setAskOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header onOpenAsk={() => setAskOpen(true)} />

      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>

        <Sidebar
          documents={documents}
        />

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
        <AskAI open={askOpen} onClose={() => setAskOpen(false)} />
      </Box>
    </Box>
  );
}