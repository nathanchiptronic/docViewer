export async function getDocuments() {
    try {
        const response = await fetch("/.generated/documentsIndex.json");

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar documentos", error);
        return [];
    }
}

export async function uploadDocument(file) {
    const content = await file.text();

    const response = await fetch('/api/docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, content: content })
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Falha no upload do documento");
    }

    return await response.json();
}

export async function deleteDocument(fileName) {
    const response = await fetch(`/api/docs/${encodeURIComponent(fileName)}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Falha ao deletar documento");
    }

    return await response.text();
}