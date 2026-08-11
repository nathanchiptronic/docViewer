import { useParams, useRouteLoaderData } from "react-router-dom";
import MarkdownViewer from "../components/Markdowns/markdownViewer";

export default function Document() {
    const { slug } = useParams();
    const documents = useRouteLoaderData("root");

    const document = documents?.find(doc => doc.slug === slug);

    if (!document) {
        return <p>Documento não encontrado.</p>;
    }

    return <MarkdownViewer fileName={document.fileName} directory="/docs" />;
}