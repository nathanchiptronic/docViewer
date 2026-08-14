# Documento de Teste

Este é um documento criado para testar a renderização de diferentes elementos de **Markdown** no sistema de documentação.

## 1. Títulos

# Título nível 1

## Título nível 2

### Título nível 3

#### Título nível 4

##### Título nível 5

###### Título nível 6

---

## 2. Formatação de texto

Texto normal.

**Texto em negrito**

*Texto em itálico*

***Texto em negrito e itálico***

~~Texto riscado~~

`Código inline`

Também podemos combinar **negrito com `código`** e *itálico com `código`*.

---

## 3. Links

[Google](https://www.google.com)

[GitHub](https://github.com)

Link para uma seção desta página: [Ir para o final](#conclusão)

---

## 4. Listas

### Lista não ordenada

- Primeiro item
- Segundo item
- Terceiro item
  - Subitem
  - Outro subitem
    - Subitem ainda mais profundo

### Lista ordenada

1. Primeiro passo
2. Segundo passo
3. Terceiro passo
   1. Subpasso
   2. Outro subpasso

### Lista de tarefas

- [x] Implementar renderização
- [x] Criar componente MarkdownViewer
- [x] Testar títulos
- [ ] Implementar busca
- [ ] Adicionar geração automática de documentação

---

## 5. Citações

> Esta é uma citação simples.

> O sistema de documentação tem como objetivo facilitar o acesso às informações da plataforma.
>
> Podemos ter múltiplos parágrafos dentro de uma citação.

---

## 6. Código

### Código inline

Para fazer uma requisição HTTP, podemos utilizar `fetch()`.

### JavaScript

```javascript
const response = await fetch("/api/documents");

const documents = await response.json();

console.log(documents);
```

### TypeScript

```typescript
interface Document {
    slug: string;
    fileName: string;
    title: string;
}

const document: Document = {
    slug: "arquitetura",
    fileName: "arquitetura.md",
    title: "Arquitetura do Sistema"
};
```

### JSON

```json
{
    "slug": "arquitetura",
    "fileName": "arquitetura.md",
    "title": "Arquitetura do Sistema"
}
```

### Bash

```bash
npm install
npm run dev
```

---

## 7. Tabela

| Elemento | Descrição | Status |
|----------|-----------|--------|
| Markdown | Formato utilizado na documentação | Concluído |
| React | Renderização da interface | Concluído |
| Upload | Envio de arquivos `.md` | Concluído |
| Busca | Busca por documentos | Em desenvolvimento |
| IA | Geração automática de documentação | Futuro |

### Tabela com mais informações

| Evento | Impacto | Exemplo |
|--------|---------|---------|
| RPM elevado | Redução de pontuação | Motor trabalhando em rotação elevada |
| Marcha lenta | Redução de pontuação | Motor ligado sem deslocamento |
| Frenagem brusca | Redução de pontuação | Desaceleração intensa |
| Condução econômica | Recuperação de pontuação | Aproveitamento da inércia |

---

## 8. Imagem

![Logo Chiptronic](/assets/chiptronic-logo.png)

---

## 9. Linha horizontal

Conteúdo acima.

---

Conteúdo abaixo.

---

## 10. Escapando caracteres

Alguns caracteres possuem significado especial no Markdown.

Por exemplo:

\*texto que não deve ficar em itálico\*

\# texto que não deve ser um título

---

## 11. Caracteres especiais

É importante testar caracteres utilizados na documentação real:

- Acentuação: á é í ó ú
- Crase: à
- Cedilha: ç
- Til: ã õ
- Maiúsculas: Á É Í Ó Ú
- Símbolos: © ® ™
- Matemática: ± × ÷ ≠ ≤ ≥
- Setas: → ← ↑ ↓

---

## 12. Conteúdo relacionado ao produto

# Pontuação de Motoristas e Veículos

A plataforma possui um sistema de pontuação utilizado para acompanhar o comportamento dos motoristas e o desempenho dos veículos.

Motoristas e veículos iniciam com uma pontuação de **100 pontos**.

Durante uma viagem, determinados comportamentos podem resultar na perda de pontos.

### Exemplos de eventos

- RPM elevado;
- tempo excessivo com o motor ligado;
- baixo aproveitamento da inércia;
- frenagens bruscas;
- acelerações inadequadas;
- distrações durante a condução;
- uso de celular ao dirigir.

Por outro lado, uma condução econômica e segura permite que pontos sejam recuperados ao longo do tempo.

### Objetivo

O objetivo da pontuação não é apenas penalizar comportamentos inadequados, mas incentivar uma **melhoria contínua na condução**.

Gestores de frota podem utilizar esses indicadores para:

1. Identificar motoristas que precisam de orientação.
2. Reconhecer motoristas com bom desempenho.
3. Criar campanhas de conscientização.
4. Criar programas de bonificação.
5. Reduzir custos operacionais.
6. Incentivar uma condução mais segura.

---

## 13. Exemplo de fluxo

```text
Motorista inicia viagem
        ↓
Pontuação inicial: 100
        ↓
Evento de condução inadequada
        ↓
Perda de pontos
        ↓
Condução econômica
        ↓
Recuperação de pontos
        ↓
Nova avaliação
```

---

## 14. Exemplo de alerta

> **Atenção:** o motorista apresentou uma quantidade elevada de eventos de RPM elevado durante a viagem.

**Possíveis ações:**

- Verificar o comportamento do motorista;
- analisar o trajeto realizado;
- verificar se havia condições específicas de trânsito;
- realizar orientação sobre condução econômica.

---

## 15. Exemplo de FAQ

### O motorista começa com quantos pontos?

Motoristas iniciam com **100 pontos**.

### É possível recuperar pontos?

Sim. A pontuação pode ser recuperada conforme o motorista apresenta uma condução mais econômica e adequada.

### O veículo também possui pontuação?

Sim. O sistema acompanha a pontuação tanto dos motoristas quanto dos veículos.

### Qual é o objetivo da pontuação?

A pontuação permite acompanhar o desempenho e incentivar comportamentos que contribuam para uma condução mais segura e econômica.

---

## 16. Exemplo de aviso

> **Importante:** os critérios utilizados para perda e recuperação de pontos podem variar de acordo com as regras configuradas na plataforma.

---

## 17. Exemplo de código com comentários

```javascript
// Busca os documentos disponíveis
async function getDocuments() {
    const response = await fetch("/.generated/documentsIndex.json");

    if (!response.ok) {
        throw new Error("Não foi possível carregar os documentos.");
    }

    return response.json();
}
```

---

## 18. Exemplo de seção longa

### Sobre a plataforma

A plataforma de telemetria permite que gestores de frota acompanhem informações relacionadas aos veículos e motoristas.

Por meio dos dados coletados durante as viagens, o gestor pode identificar comportamentos que impactam a segurança, o consumo de combustível e os custos operacionais da frota.

Essas informações podem ser utilizadas para criar ações de conscientização, acompanhar a evolução dos motoristas e identificar oportunidades de melhoria.

A análise contínua desses indicadores permite que a empresa tome decisões baseadas em dados e acompanhe os resultados das ações realizadas.

---

## 19. Vídeo local

Este vídeo deve ser carregado a partir da pasta pública do sistema.

<video controls width="100%"> <source src="/assets/videos/demo.mp4" type="video/mp4"> Seu navegador não suporta a reprodução de vídeos. </video>

---

## 20. Vídeo do YouTube

Este exemplo testa a incorporação de um vídeo externo utilizando um iframe.

<iframe width="560" height="315" src="https://www.youtube.com/embed/1w7OgIMMRc4" title="Guns N' Roses - Sweet Child O' Mine" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>

---

## Conclusão

Este documento reúne diferentes tipos de conteúdo que podem aparecer na documentação.

O objetivo é garantir que o sistema consiga renderizar corretamente:

- títulos;
- textos;
- formatação;
- links;
- listas;
- listas de tarefas;
- citações;
- código;
- tabelas;
- imagens;
- vídeos locais;
- vídeos incorporados do YouTube;
- caracteres especiais;
- conteúdo extenso;
- conteúdo relacionado ao produto;
- FAQs;
- alertas;
- exemplos técnicos.

**Fim do documento de teste.**
