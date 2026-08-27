const apiUrl = import.meta.env.VITE_API_URL;

export async function getDocuments() {
    const response = await fetch(`${apiUrl}/docs`);

    if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    return (await response.json()).data;
}

export async function getDocument(slug) {
    const response = await fetch(`${apiUrl}/docs/${slug}`);

    if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    return (await response.json()).data;
}

export async function uploadDocument(file) {
    const formData = new FormData();

    formData.append("document", file);

    const response = await fetch(`${apiUrl}/docs`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(data.message || "Falha no upload do documento");
    }

    return await response.json();
}

export async function deleteDocument(slug) {
    const response = await fetch(`${apiUrl}/docs/${slug}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Falha ao deletar documento");
    }

    return await response.text();
}