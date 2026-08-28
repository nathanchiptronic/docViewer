import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import DescriptionIcon from '@mui/icons-material/Description';
import Search from './Search';
import { IconButton } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Header({ onOpenAsk }) {
    return (
        <AppBar position="static">
            <Toolbar sx={{ position: "relative" }}>
                <DescriptionIcon sx={{ mr: 1 }} />

                <Typography variant="h6">
                    Doc Viewer
                </Typography>

                <Search />

                <IconButton
                    onClick={onOpenAsk}
                    sx={{ ml: "auto", color: "#fff" }}
                    title="Pergunte à IA"
                >
                    <AutoAwesomeIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}