import { Box, InputAdornment, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {searchDocuments} from '../../../documents/searchService'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const navigate = useNavigate();

    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState("");
    const [bufferedTerm, setBufferedTerm] = useState("");
    const [results, setResults] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setBufferedTerm(query);
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        setErrors(null);
        async function search() {
            try {
                const searchResults = await searchDocuments(bufferedTerm);
                setResults(searchResults);
            } catch (error) {
                setErrors(error.message);
            }
        }

        if (bufferedTerm.trim()) {
            search();
        } else {
            setResults([]);
        }
    }, [bufferedTerm]);

    return (
        <Box
            sx={{
                position: "absolute",
                top: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "400px",
                zIndex: 10,
            }}
        >
            <TextField
                fullWidth
                size="small"
                placeholder="Buscar documentação..."
                value={query}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                    "& .MuiInputBase-root": {
                        backgroundColor: "#fff",
                        color: "#333",
                        borderRadius: results.length > 0 ? "4px 4px 0 0" : "4px",
                    },
                    "& .MuiInputBase-input::placeholder": {
                        color: "#777",
                        opacity: 1,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ddd",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#bbb",
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ddd",
                    },
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#777" }} />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            {focused && results.length > 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        borderRadius: "0 0 4px 4px",
                        border: "1px solid #ddd",
                        borderTop: "none",
                        overflow: "hidden",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    {results.map((result) => (
                        <ListItemButton
                            key={`${result.slug}-${result.anchor}`}
                            onMouseDown={() => {
                                navigate(`/docs/${result.slug}/#${result.anchor}`);
                                setQuery("");
                                setResults([]);
                            }}
                            sx={{
                                px: 2,
                                py: 1,
                                "&:hover": { backgroundColor: "#f5f5f5" },
                                "&:focus": { backgroundColor: "#f5f5f5" },
                            }}
                        >
                            <ListItemText
                                primary={result.sectionTitle}
                                secondary={
                                    <>
                                        <Typography component="span" sx={{ display: "block", fontSize: "0.75rem", color: "#888" }}>
                                            {result.documentTitle}
                                        </Typography>
                                        {result.breadcrumb && (
                                            <Typography component="span" sx={{ display: "block", fontSize: "0.7rem", color: "#aaa" }}>
                                                {result.breadcrumb}
                                            </Typography>
                                        )}
                                    </>
                                }
                                slotProps={{
                                    primary: { sx: { fontSize: "0.9rem", color: "#333" } },
                                    secondary: { component: "div" },
                                }}
                            />
                        </ListItemButton>
                    ))}
                </Box>
            )}

            {focused && errors && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        borderRadius: "0 0 4px 4px",
                        border: "1px solid #ddd",
                        borderTop: "none",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <Typography variant="body2" color="error" sx={{ px: 2, py: 1 }}>
                        Erro ao buscar documentos.
                    </Typography>
                </Box>
            )}
        </Box>
    );
}