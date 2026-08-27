const apiUrl = import.meta.env.VITE_API_URL;

export async function searchDocuments(query, limit = null) {
  const params = new URLSearchParams({ q: query });
  if (limit) params.set('limit', limit);

  const response = await fetch(`${apiUrl}/search?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Erro HTTP! Status: ${response.status}`);
  }

  return (await response.json()).data;
}

export async function askToAI(question) {
  const response = await fetch(`${apiUrl}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP! Status: ${response.status}`);
  }

  return (await response.json()).data;
}