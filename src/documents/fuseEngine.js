import Fuse from "fuse.js";

export function createSearchItems(searchIndex) {
  const sections = searchIndex.flatMap(index =>
    index.sections.map(section => ({
      slug: index.slug,
      documentTitle: index.title,
      sectionTitle: section.title,
      anchor: section.anchor,
      content: section.content,
    }))
  );

  return sections;
}

export function createSearchEngine(searchIndex) {
  const items = createSearchItems(searchIndex);

  return new Fuse(items, {
    keys: [
      { name: "documentTitle", weight: 0.5 },
      { name: "sectionTitle", weight: 0.3 },
      { name: "content", weight: 0.2 },
    ],
    includeScore: true,
    includeMatches: true,
    threshold: 0.35,
    ignoreLocation: true,
    ignoreDiacritics: true,
    minMatchCharLength: 2,
  });
}

export function search(engine, query) {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 2) {
    return [];
  }

  return engine.search(normalizedQuery);
}