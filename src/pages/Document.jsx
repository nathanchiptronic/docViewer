import { useLoaderData } from "react-router-dom";
import MarkdownViewer from "../components/Markdowns/markdownViewer";
import { Typography } from "@mui/material";

export default function Document() {
    const document = useLoaderData();

    if (!document) {
        return <Typography>Documento não encontrado</Typography>;
    }

    return <MarkdownViewer content={document.content} />;
}