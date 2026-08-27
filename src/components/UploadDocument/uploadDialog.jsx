import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from "@mui/material/Chip";
import DescriptionIcon from "@mui/icons-material/Description";

import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";

import { uploadDocument } from "../../documents/documentsApi";

import AlertToast from "../shared/AlertToast";

export default function UploadDialog({ open, setOpen, onUpload }) {
    const navigate = useNavigate()
    const { revalidate } = useRevalidator();

    const [file, setFile] = useState(null);
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            setFile(selectedFile);
        }
    }

    const handleSubmit = async () => {
        setSending(true);

        try {
            const result = await uploadDocument(file);

            setToast({
                open: true,
                message: "Documento enviado com sucesso!",
                severity: "success",
            });

            setFile(null);
            setOpen(false);

            await (onUpload?.() ?? revalidate());

            const data = await result.data

            navigate(`/docs/${data.slug ?? data.filename.replace(/\.md$/, "")}`);
        } catch (error) {
            setToast({
                open: true,
                message: error.message,
                severity: "error",
            });
        }

        setSending(false);
    };

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Upload de documento</DialogTitle>

                <DialogContent
                    sx={{
                        width: 500,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        pt: 2,
                    }}
                >
                    <input
                        hidden
                        id="upload-file"
                        type="file"
                        accept=".md"
                        onChange={handleFileChange}
                    />

                    <Box
                        sx={{
                            border: "2px dashed",
                            borderColor: "divider",
                            borderRadius: 2,
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            textAlign: "center",
                        }}
                    >
                        <DescriptionIcon color="action" sx={{ fontSize: 48 }} />

                        <Typography variant="body1">
                            Selecione um arquivo Markdown (.md)
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Apenas um arquivo por vez.
                        </Typography>

                        <label htmlFor="upload-file">
                            <Button
                                component="span"
                                variant="contained"
                            >
                                Selecionar arquivo
                            </Button>
                        </label>
                    </Box>

                    {file && (
                        <Chip
                            icon={<DescriptionIcon />}
                            label={file.name}
                            color="primary"
                            variant="outlined"
                            onDelete={() => setFile(null)}
                        />
                    )}
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => setOpen(false)} disabled={sending}>
                        Cancelar
                    </Button>

                    <Button variant="contained" disabled={!file ? true : sending} onClick={() => handleSubmit()}>
                        {sending === false ? "Enviar" : "Enviando..."}
                    </Button>
                </DialogActions>
            </Dialog>

            <AlertToast toast={toast} setToast={setToast} />
        </>
    )
}