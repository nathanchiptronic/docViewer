import { createSearchEngine, search } from "./fuseEngine";
import getSearchIndex from "./searchIndexApi";

let cachedEngine = null;

async function getEngine() {
  if (cachedEngine) return cachedEngine;

  const index = await getSearchIndex();
  cachedEngine = createSearchEngine(index);
  return cachedEngine;
}

export function invalidateSearchCache() {
  cachedEngine = null;
}

export default async function searchDocuments(query) {
  const engine = await getEngine();
  return search(engine, query);
}