import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import DescriptionIcon from '@mui/icons-material/Description';

export default function Header() {

    return (
        <AppBar position='static'>
            <Toolbar>
                <DescriptionIcon sx={{ mr: 1 }}/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Doc Viewer
                </Typography>
            </Toolbar>
        </AppBar>
    )
}