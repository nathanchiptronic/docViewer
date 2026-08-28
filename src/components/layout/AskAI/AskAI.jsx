import { useState, useRef, useEffect } from "react";
import { Box, Drawer, IconButton, TextField, Typography, CircularProgress, Divider } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import MarkdownViewer from "../../Markdowns/markdownViewer";
import { askToAI } from "../../../documents/searchService";

export default function AskAI({ open, onClose }) {
    const navigate = useNavigate();
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function handleSend() {
        const trimmed = question.trim();
        if (!trimmed || loading) return;

        setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
        setQuestion("");
        setError(null);
        setLoading(true);

        try {
            const result = await askToAI(trimmed);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: result.answer, sources: result.sources },
            ]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 420, display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    <Typography variant="h6">Perguntar à IA</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </Box>
                <Divider />

                <Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    {messages.length === 0 && !loading && (
                        <Typography variant="body2" color="text.secondary">
                            Pergunte algo sobre a documentação.
                        </Typography>
                    )}

                    {messages.map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                alignSelf: message.role === "user" ? "flex-end" : "stretch",
                                backgroundColor: message.role === "user" ? "#e3f2fd" : "#f5f5f5",
                                borderRadius: 2,
                                p: 1.5,
                                maxWidth: message.role === "user" ? "80%" : "100%",
                            }}
                        >
                            {message.role === "user" ? (
                                <Typography variant="body2">{message.content}</Typography>
                            ) : (
                                <>
                                    <MarkdownViewer content={message.content} />
                                    {message.sources?.length > 0 && (
                                        <Box sx={{ mt: 1, pt: 1, borderTop: "1px solid #ddd" }}>
                                            <Typography variant="caption" color="text.secondary">Fontes:</Typography>
                                            {message.sources.map((source) => (
                                                <Typography
                                                    key={`${source.slug}-${source.anchor}`}
                                                    variant="caption"
                                                    component="div"
                                                    sx={{ cursor: "pointer", color: "primary.main", "&:hover": { textDecoration: "underline" } }}
                                                    onClick={() => {
                                                        navigate(`/docs/${source.slug}/#${source.anchor}`);
                                                        onClose();
                                                    }}
                                                >
                                                    {source.documentTitle} — {source.sectionTitle}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                </>
                            )}
                        </Box>
                    ))}

                    {loading && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CircularProgress size={16} />
                            <Typography variant="body2" color="text.secondary">Pensando...</Typography>
                        </Box>
                    )}

                    {error && <Typography variant="body2" color="error">{error}</Typography>}

                    <div ref={bottomRef} />
                </Box>

                <Divider />
                <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                    <TextField
                        fullWidth
                        size="small"
                        multiline
                        maxRows={4}
                        placeholder="Digite sua pergunta..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <IconButton color="primary" onClick={handleSend} disabled={loading || !question.trim()}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Drawer>
    );
}