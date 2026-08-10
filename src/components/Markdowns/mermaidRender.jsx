import mermaid from "mermaid";
import { useEffect, useRef } from "react";

mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    look: "classic",
});

function generateId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    // fallback para contextos não-seguros (ex: acesso via IP local em dev)
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default function MermaidRender({ chart }) {
    const containerRef = useRef(null)

    useEffect(() => {
        const id = `mermaid-${generateId()}`;

        const renderDiagram = async () => {
            const { svg } = await mermaid.render(id, chart);

            if (containerRef.current) {
                containerRef.current.innerHTML = svg;
            }
        }

        renderDiagram();
    }, [chart]);

    return <div ref={containerRef}></div>
}