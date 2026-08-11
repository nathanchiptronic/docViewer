import fs from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';

async function extractTitle(fileName) {
    const filePath = path.join(process.cwd(), "public", "docs", fileName);
    const content = await readFile(filePath, "utf-8");

    const match = content.match(/^#\s+(.+)$/m);

    if (match) return match[1].trim();

    return fileName
        .replace(/\.md$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function generateDocumentsIndex() {
    try {
        const docsDir = path.join(process.cwd(), "public", "docs");
        const outputDir = path.join(process.cwd(), "public", ".generated");
        const outputFile = path.join(outputDir, "documentsIndex.json");

        const markdowns = fs
            .readdirSync(docsDir)
            .filter(file => file.endsWith(".md"));

        const documentsIndex = await Promise.all(
            markdowns.map(async (file) => {
                const title = await extractTitle(file);

                return {
                    slug: path.parse(file).name,
                    fileName: file,
                    title,
                };
            })
        );

        fs.mkdirSync(outputDir, { recursive: true });

        fs.writeFileSync(outputFile, JSON.stringify(documentsIndex, null, 2));
    } catch (error) {
        console.error('Error ao criar documentIndex', error);
    }
}