import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ApiIcon from "@mui/icons-material/Api";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AnchorIcon from "@mui/icons-material/Anchor";

const features = [
  {
    icon: DescriptionIcon,
    label: "Markdown",
    title: "Renderização de Markdown",
    description:
      "Documentos escritos em Markdown são renderizados automaticamente. Suporte completo a títulos, listas, tabelas, blocos de código com destaque de sintaxe e diagramas Mermaid.",
    tags: ["Markdown", "Mermaid", "Syntax Highlight"],
  },
  {
    icon: SearchIcon,
    label: "Busca",
    title: "Busca por seção",
    description:
      "A busca indexa cada seção de cada documento separadamente. Os resultados mostram o título da seção e o documento de origem — basta clicar para navegar diretamente ao trecho relevante.",
    tags: ["API Search", "Full-text", "Real-time"],
  },
  {
    icon: UploadFileIcon,
    label: "Upload",
    title: "Upload de documentos",
    description:
      "Novos arquivos .md podem ser adicionados diretamente pela interface, sem acesso ao sistema de arquivos. O upload é processado pela API externa e o índice de busca é atualizado automaticamente.",
    tags: [".md", "API externa", "Auto-indexação"],
  },
  {
    icon: DeleteForeverIcon,
    label: "Remoção",
    title: "Remoção de documentos",
    description:
      "Documentos podem ser removidos pela sidebar. Um diálogo de confirmação é exibido antes de qualquer remoção, e o índice é atualizado imediatamente após.",
    tags: ["Confirmação", "API externa"],
  },
  {
    icon: ApiIcon,
    label: "API Block",
    title: "Bloco interativo de API",
    description:
      "Endpoints REST podem ser documentados com o bloco especial `api`. Ele exibe método, URL, exemplos de request e response — e permite disparar a requisição real direto da página.",
    tags: ["REST", "Live test", "JSON"],
  },
  {
    icon: AnchorIcon,
    label: "Âncoras",
    title: "Navegação por âncoras",
    description:
      "Todos os títulos dos documentos geram âncoras automaticamente. Links internos e resultados de busca navegam diretamente à seção correta com scroll suave.",
    tags: ["Smooth scroll", "Deep link"],
  },
];

const stack = [
  { label: "React", description: "Interface e componentes" },
  { label: "Vite", description: "Build e servidor de dev" },
  { label: "React Router", description: "Roteamento e loaders" },
  { label: "MUI", description: "Componentes visuais" },
  { label: "react-markdown", description: "Renderização de Markdown" },
  { label: "Mermaid", description: "Diagramas" },
];

const howItWorks = [
  {
    step: "01",
    title: "Documentos via API externa",
    description:
      "Os documentos são armazenados e gerenciados por uma API externa. O frontend busca a lista de documentos, faz upload e remove arquivos diretamente dessa API via variável de ambiente VITE_API_URL.",
  },
  {
    step: "02",
    title: "Busca integrada via API",
    description:
      "A busca é realizada diretamente na API do backend em tempo real. O frontend utiliza técnicas como debounce para garantir que as buscas sejam eficientes e não sobrecarreguem o servidor.",
  },
  {
    step: "03",
    title: "Roteamento e carregamento",
    description:
      "O React Router carrega a lista de documentos uma única vez no layout raiz via loader. As páginas de documento buscam o conteúdo correspondente e renderizam o Markdown.",
  },
  {
    step: "04",
    title: "Interface Ágil e Responsiva",
    description:
      "Desenvolvido com MUI (Material-UI), o sistema oferece uma interface de usuário moderna, acessível e responsiva, garantindo a mesma qualidade em desktops e dispositivos móveis.",
  },
];

export default function Home() {
  return (
    <Box
      sx={{
        maxWidth: 860,
        mx: "auto",
        py: 6,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {/* Hero */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <AccountTreeIcon sx={{ color: "primary.main", fontSize: 32 }} />
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: 3,
              fontSize: "0.7rem",
            }}
          >
            Chiptronic — Sistema interno
          </Typography>
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: -0.5,
            color: "text.primary",
          }}
        >
          DocViewer
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontWeight: 400,
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          Sistema de documentação técnica baseado em Markdown. Centraliza, organiza e torna
          pesquisável toda a documentação dos projetos da Chiptronic.
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          <Chip label="Em desenvolvimento" color="warning" size="small" variant="outlined" />
          <Chip label="Uso interno" color="primary" size="small" variant="outlined" />
          <Chip label="v0.1 — MVP" size="small" variant="outlined" />
        </Box>
      </Box>

      <Divider />

      {/* Como funciona */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2 }}>
            Como funciona
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            Arquitetura do sistema
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          {howItWorks.map((item) => (
            <Box
              key={item.step}
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: `"${item.step}"`,
                  position: "absolute",
                  top: -8,
                  right: 12,
                  fontSize: "4rem",
                  fontWeight: 900,
                  color: "primary.main",
                  opacity: 0.06,
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2 }}
              >
                {item.step}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Funcionalidades */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2 }}>
            Funcionalidades
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            O que o sistema oferece
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 2.5,
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Box
                key={feature.label}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    bgcolor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ color: "white", fontSize: 20 }} />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mt: "auto", pt: 1 }}>
                  {feature.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Divider />

      {/* Stack */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2 }}>
            Stack
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            Tecnologias utilizadas
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
            gap: 2,
          }}
        >
          {stack.map((item) => (
            <Box
              key={item.label}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {item.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Rodapé */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Typography variant="caption" color="text.disabled">
          © 2026 Chiptronic — Todos os direitos reservados. Uso interno.
        </Typography>
        <Typography variant="caption" color="text.disabled">
          DocViewer — v0.1 MVP
        </Typography>
      </Box>
    </Box>
  );
}
