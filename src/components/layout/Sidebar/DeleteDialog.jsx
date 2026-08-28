import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

import { deleteDocument } from "../../../documents/documentsApi";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../contexts/ToastContext";

export default function DeleteDialog({ open, setOpen, document, onRefresh }) {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        setDeleting(true);
        try {
            await deleteDocument(document.slug);

            showToast("Documento deletado com sucesso!", "success");

            setOpen(false)
            await onRefresh?.();
            navigate("/");
        } catch (error) {
            showToast(error.message, "error");
        }
        setDeleting(false);
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Deletar documento</DialogTitle>

            <DialogContent
                sx={{
                    width: 500,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    pt: 2,
                }}
            >
                <Typography>Deseja deletar o documento {document?.title}?</Typography>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={() => setOpen(false)}>
                    Cancelar
                </Button>

                <Button variant="contained" sx={{ bgcolor: "red" }} disabled={deleting} onClick={() => handleDelete()}>
                    {deleting ? "Deletando..." : "Deletar"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}