export default async function getSearchIndex() {
    try {
        const response = await fetch("/.generated/searchIndex.json");

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error("Erro ao acessar Search Index", error);
    }
}