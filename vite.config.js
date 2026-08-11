import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import generateDocumentsIndex from './server/generateDocumentsIndex';
import fs from 'fs';
import path from 'path';

function markdownPlugin() {
  return {
    name: "markdown-plugin",

    configureServer(server) {
      generateDocumentsIndex();

      server.middlewares.use(async (req, res, next) => {
        // POST /api/docs
        if (req.method === "POST" && req.url === "/api/docs") {
          try {
            let body = "";
            for await (const chunk of req) body += chunk;

            const { fileName, content } = JSON.parse(body);

            if (typeof fileName !== "string" || typeof content !== "string") {
              res.statusCode = 400;
              return res.end("fileName e content são obrigatórios");
            }

            if (!fileName.endsWith(".md")) {
              res.statusCode = 400;
              return res.end("Só arquivos .md são permitidos");
            }

            const safeName = path.basename(fileName);
            const filePath = path.join(
              process.cwd(),
              "public",
              "docs",
              safeName
            );

            if (fs.existsSync(filePath)) {
              res.statusCode = 409;
              return res.end("Já existe um arquivo com esse nome");
            }

            fs.writeFileSync(filePath, content, "utf-8");
            await generateDocumentsIndex();

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            const slug = path.parse(safeName).name;

            return res.end(JSON.stringify({
              ok: true,
              fileName: safeName,
              slug,
            }));
          } catch (error) {
            console.error(error);
            res.statusCode = 500;
            return res.end("Erro interno no servidor");
          }
        }

        // DELETE /api/docs/:fileName
        if (
          req.method === "DELETE" &&
          req.url?.startsWith("/api/docs/")
        ) {
          const fileName = decodeURIComponent(
            req.url.slice("/api/docs/".length)
          );

          const safeName = path.basename(fileName);
          const filePath = path.join(
            process.cwd(),
            "public",
            "docs",
            safeName
          );

          if (!fs.existsSync(filePath)) {
            res.statusCode = 404;
            return res.end("Arquivo não encontrado");
          }

          fs.unlinkSync(filePath);
          await generateDocumentsIndex();

          res.statusCode = 204;
          return res.end("Documento deletado");
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    markdownPlugin()
  ],
})
