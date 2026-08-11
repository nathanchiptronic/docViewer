import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";

import SidebarButton from "./SidebarButton";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertToast from "../../shared/AlertToast";
import DeleteDialog from "./DeleteDialog";

export default function Sidebar({ documents = [], onRefresh }) {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [documentToDelete, setDocumentToDelete] = useState(null);


  function openDialog(document) {
    setOpen(true);
    setDocumentToDelete(document);
  }

  return (
    <>
      <Box sx={{ bgcolor: "primary.main", width: 240, height: "100%", overflowY: "auto" }}>
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Início" sx={{ textAlign: "center", width: "100%", color: "white" }} />
            </ListItemButton>
          </ListItem>

          <Divider />

          {documents.map((document) => (
            <SidebarButton
              key={document.slug}
              title={document.title}
              slug={document.slug}
              onDelete={() => openDialog(document)}
            />
          ))}
        </List>
      </Box>

      <DeleteDialog 
        open={open} 
        setOpen={setOpen} 
        setToast={setToast} 
        document={documentToDelete} 
        onRefresh={onRefresh} 
      />

      <AlertToast toast={toast} setToast={setToast} />
    </>
  );
}