import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import DescriptionIcon from '@mui/icons-material/Description';
import Search from './Search';

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar sx={{ position: "relative" }}>
                <DescriptionIcon sx={{ mr: 1 }} />

                <Typography variant="h6">
                    Doc Viewer
                </Typography>

                <Search />
            </Toolbar>
        </AppBar>
    );
}