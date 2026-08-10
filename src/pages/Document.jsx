import { useParams } from "react-router-dom";
import MarkdownViewer from "../components/Markdowns/markdownViewer";
import { useEffect, useState } from "react";
import { getDocuments } from "../utils/documentsApi";

export default function Document() {
    const { slug } = useParams();

    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDocument() {
            setLoading(true);

            const documents = await getDocuments();
            const foundDocument = documents.find(doc => doc.slug === slug);

            setDocument(foundDocument ?? null);
            setLoading(false);
        }

        loadDocument();
    }, [slug]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!document) {
        return <p>Documento não encontrado.</p>;
    }

    return <MarkdownViewer fileName={document.fileName} directory="/docs" />;
}