import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

import { deleteDocument } from "../../utils/documentsApi";
import { useNavigate, useRevalidator } from "react-router-dom";

export default function DeleteDialog({ open, setOpen, setToast, document, onRefresh }) {
    const navigate = useNavigate();
    const { revalidate } = useRevalidator();

    const [deleteting, setDeleting] = useState(false);

    async function handleDelete() {
        setDeleting(true);
        try {
            const result = await deleteDocument(document.fileName);

            setToast({
                open: true,
                message: "Documento deletado com sucesso!",
                severity: "success",
            })

            setOpen(false)
            await (onRefresh?.() ?? revalidate());
            navigate("/");
        } catch (error) {
            setToast({
                open: true,
                message: error.message,
                severity: "error",
            })
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

                <Button variant="contained" sx={{ bgcolor: "red" }} onClick={() => handleDelete()}>
                    Deletar
                </Button>
            </DialogActions>
        </Dialog>
    )
}