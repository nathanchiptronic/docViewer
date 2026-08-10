import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

import NotesIcon from '@mui/icons-material/Notes';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteDocuments } from "../../utils/documentsApi";


export default function SidebarButton({ title, slug, onDelete }) {
    const navigate = useNavigate();

    return (
        <ListItem
            className="item-lista"
            disablePadding
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{
                        display: 'none',
                        '.item-lista:hover &': {
                            display: 'inline-flex',
                        },
                    }}
                    onClick={onDelete}
                >
                    <DeleteForeverIcon sx={{ color: "red" }}/>
                </IconButton>
            }
        >
            <ListItemButton onClick={() => navigate(`/docs/${slug}`)}>
                <ListItemIcon>
                    <NotesIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={title} sx={{ textAlign: "center", width: "100%", color: "white" }} />
            </ListItemButton>
        </ListItem>
    );
}