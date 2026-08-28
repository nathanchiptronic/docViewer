import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";

import SidebarButton from "./SidebarButton";

import { useNavigate, useRevalidator } from "react-router-dom";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import UploadDialog from "./UploadDialog";

export default function Sidebar({ documents = [] }) {
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const [openUpload, setOpenUpload] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const handleDeleteClick = (document) => {
    setDocumentToDelete(document);
    setOpenDelete(true);
  };

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        width: 240,
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >

      <List>
        <ListItem>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>

            <ListItemText
              primary="Início"
              sx={{
                textAlign: "center",
                width: "100%",
                color: "white"
              }}
            />
          </ListItemButton>
        </ListItem>

        <Divider />
      </List>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto"
        }}
      >
        <List>
          {documents.map((document) => (
            <SidebarButton
              key={document.slug}
              title={document.title}
              slug={document.slug}
              onDelete={() => handleDeleteClick(document)}
            />
          ))}
        </List>
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: "1px solid rgba(255,255,255,0.2)"
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={() => setOpenUpload(true)}
          sx={{
            bgcolor: "white",
            color: "primary.main",
            "&:hover": {
              bgcolor: "grey.100"
            }
          }}
        >
          Upload
        </Button>
      </Box>

      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        document={documentToDelete}
        onRefresh={revalidate}
      />

      <UploadDialog
        open={openUpload}
        setOpen={setOpenUpload}
        onUpload={revalidate}
      />
    </Box>
  );
}