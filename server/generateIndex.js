import fs from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';

import RemoveMarkdown from 'remove-markdown';

function getMarkdons() {
    const docsDir = path.join(process.cwd(), "public", "docs");

    const markdowns = fs
        .readdirSync(docsDir)
        .filter(file => file.endsWith(".md"));

    return markdowns;
}

async function readMarkdown(fileName) {
    const filePath = path.join(process.cwd(), "public", "docs", fileName);
    return await readFile(filePath, "utf-8");
}

function extractTitle(markdown, fileName) {
    const match = markdown.match(/^#\s+(.+)$/m);

    if (match) return match[1].trim();

    return fileName
        .replace(/\.md$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractSections(markdown) {
    const lines = markdown.split(/\r?\n/);

    const sections = [];
    let currentSection = null;

    for (const line of lines) {
        const heading = line.match(/^(#{2,6})\s+(.+)$/);

        if (heading) {
            if (currentSection) {
                sections.push({
                    ...currentSection,
                    content: RemoveMarkdown(currentSection.content)
                        .replace(/\s+/g, " ")
                        .trim(),
                });
            }

            const sectionTitle = heading[2].trim();

            const anchor = sectionTitle
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-");

            currentSection = {
                title: sectionTitle,
                level: heading[1].length,
                anchor,
                content: ""
            };

            continue;
        }

        if (currentSection) {
            currentSection.content += line + "\n";
        }
    }

    if (currentSection) {
        sections.push({
            ...currentSection,
            content: RemoveMarkdown(currentSection.content)
                .replace(/\s+/g, " ")
                .trim(),
        });
    }

    return sections;
}

export async function generateIndex() {
    try {
        const outputDir = path.join(process.cwd(), "public", ".generated");

        const markdowns = getMarkdons();

        const indexes = await Promise.all(markdowns.map(async (fileName) => {
            const content = await readMarkdown(fileName);
            const title = extractTitle(content, fileName);

            return {
                document: {
                    slug: fileName.replace(/\.md$/, ""),
                    fileName: fileName,
                    title: title
                },
                search: {
                    slug: fileName.replace(/\.md$/, ""),
                    fileName: fileName,
                    title: title,
                    sections: extractSections(content),
                    content: RemoveMarkdown(content)
                        .replace(/\s+/g, " ")
                        .trim(),
                }
            }
        }))

        const documentsIndex = indexes.map((index) => index.document);
        const searchIndex = indexes.map((index) => index.search)


        fs.mkdirSync(outputDir, { recursive: true });

        fs.writeFileSync(path.join(outputDir, "documentsIndex.json"), JSON.stringify(documentsIndex, null, 2));
        fs.writeFileSync(path.join(outputDir, "searchIndex.json"), JSON.stringify(searchIndex, null, 2));

    } catch (error) {
        console.error('Erro ao criar documentIndex', error);
    }
}

