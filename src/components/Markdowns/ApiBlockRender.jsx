import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Collapse from "@mui/material/Collapse";
import { alpha } from "@mui/material/styles";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from "@mui/material/Chip";
import CodeRender from "./CodeRender";
import { AccordionActions, Button, Divider, Alert } from "@mui/material";
import { useState } from "react";

  // ```api
  // {
  //   "method": "GET",
  //   "url": "https://api.exemplo.com/v1/veiculos",
  //   "description": "Retorna todos os veículos cadastrados para a empresa autenticada.",
  //   "headers": {
  //     "Authorization": "Bearer <token>",
  //     "Content-Type": "application/json"
  //   },
  //   "request": null,
  //   "response": {
  //     "data": [
  //       {
  //         "id": "veh_123",
  //         "placa": "ABC1D23",
  //         "modelo": "Tracker",
  //         "ativo": true
  //       },
  //       {
  //         "id": "veh_456",
  //         "placa": "XYZ9A87",
  //         "modelo": "Onix",
  //         "ativo": true
  //       }
  //     ],
  //     "total": 2
  //   }
  // }
  // ```

export default function ApiBlockRender({ apiBlock }) {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  let api;
  try {
    api = JSON.parse(apiBlock);
  } catch {
    return (
      <Typography color="error">
        Bloco API inválido: JSON malformado.
      </Typography>
    );
  }

  const displayUrl = api.url.replace(/^https?:\/\//, "");

  const methodColors = {
    GET: "info",
    POST: "success",
    PUT: "warning",
    PATCH: "warning",
    DELETE: "error"
  };

  const color = methodColors[api.method] ?? "info";

  async function endpointTeste() {
    setError(null);
    setData(null);
    try {
      const response = await fetch(api.url, {
        method: api.method,
        headers: api.headers,
        body: api.request === null ? undefined : JSON.stringify(api.request),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!response.ok) {
        setError({
          type: "http",
          status: response.status,
          data: data,
        });

        return;
      }

      setData(
        Array.isArray(data) && data.length > 10
          ? data.slice(0, 10)
          : data
      );

    } catch (err) {
      setError({
        type: "network",
        message: err.message,
      });
    }
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
      sx={{
        boxShadow: "none",
        "&::before": {
          display: "none",
        },
        border: "2px solid",
        borderColor: (theme) =>
          alpha(theme.palette[color].main, 0.3),
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          p: 1,
          minHeight: 48,
          backgroundColor: (theme) =>
            alpha(theme.palette[color].main, 0.1),

          "&.Mui-expanded": {
            minHeight: 48,
          },

          "& .MuiAccordionSummary-content": {
            margin: 0,
            alignItems: "center",
          },

          "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <Chip
          label={api.method}
          color={color}
          sx={{
            borderRadius: 2,
            fontWeight: "bold",
            fontSize: 16,
            letterSpacing: 2,
          }}
        />

        <Typography
          component="span"
          sx={{
            ml: 2,
            fontSize: 18,
            fontWeight: "bold",
            flex: 1,
            minWidth: 0,
            overflowWrap: "anywhere",
          }}
        >
          {displayUrl}
        </Typography>

        {!expanded && (
          <Typography
            component="span"
            color="textDisabled"
            sx={{
              ml: 1,
              fontSize: 14,
              maxWidth: "30%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {api.description}
          </Typography>
        )}
      </AccordionSummary>

      <AccordionDetails>
        <Typography
          component="p"
          sx={{
            mt: 0,
            mb: 2,
            fontSize: 15,
          }}
        >
          {api.description}
        </Typography>

        <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
          Request:
        </Typography>
        <CodeRender language="json" content={api.request} />

        <Divider />
        <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
          Response:
        </Typography>
        <CodeRender language="json" content={api.response} />

        <Collapse in={data !== null} timeout={600}>
          <Divider sx={{ my: 2 }} />

          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            Resultado do teste:
          </Typography>

          <CodeRender language="json" content={data} />
        </Collapse>

        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
              border: "2px solid",
              borderColor: "error.main",
              backgroundColor: (theme) =>
                alpha(theme.palette.error.main, 0.08),
              borderRadius: 2,
            }}
          >
            <Typography fontWeight="bold">
              {error.status
                ? `Erro na requisição — HTTP ${error.status}`
                : "Erro ao executar a requisição"}
            </Typography>

            {error.message && (
              <Typography variant="body2">
                {error.message}
              </Typography>
            )}

            {error.data && (
              <CodeRender language="json" content={error.data} />
            )}
          </Alert>
        )}
      </AccordionDetails>

      <AccordionActions>
        <Button
          variant="contained"
          color={color} onClick={() => endpointTeste()}
        >
          Testar
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ display: (data || error) ? "block" : "none" }}
          onClick={() => { setData(null); setError(null); }}
        >
          Fechar
        </Button>
      </AccordionActions>
    </Accordion>
  );
}