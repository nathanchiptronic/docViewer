import Fab from "@mui/material/Fab";

import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function UploadButton({ setOpen }) {

    return(
        <Fab
            color="primary"
            sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
            }}

            onClick={() => setOpen(true)}
        >
            <FileUploadIcon />
        </Fab>
    )
}