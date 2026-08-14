# Documentando Endpoints de API

Este sistema suporta um bloco especial para documentar e testar endpoints de API diretamente na página de documentação. Para usá-lo, basta criar um bloco de código com a linguagem `api` e preencher os campos no formato JSON.

## Blocos de código

Antes de entender o bloco `api`, é importante saber como blocos de código funcionam neste sistema. Um bloco de código começa e termina com três crases (` ``` `), e logo após as crases de abertura você indica a linguagem — isso ativa o destaque de sintaxe correto:

````markdown
```javascript
function saudacao(nome) {
  return `Olá, ${nome}!`;
}
```
````

````javascript
function saudacao(nome) {
  return `Olá, ${nome}!`;
}
````

````markdown
```json
{
  "nome": "João",
  "idade": 30
}
```
````

````json
{
  "nome": "João",
  "idade": 30
}
````

As linguagens mais comuns suportadas são: `javascript`, `typescript`, `python`, `json`, `bash`, `sql`, `html`, `css`, entre outras. O bloco `api` descrito neste guia é uma extensão especial desse mesmo formato — em vez de apenas exibir código com destaque de sintaxe, ele renderiza um componente interativo.

## Estrutura do bloco `api`

~~~markdown
````api
{
  "method": "",
  "url": "",
  "description": "",
  "headers": {},
  "request": null,
  "response": {}
}
````
~~~

## Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `method` | string | sim | Verbo HTTP do endpoint: `GET`, `POST`, `PUT`, `PATCH` ou `DELETE` |
| `url` | string | sim | URL completa do endpoint, incluindo `https://` |
| `description` | string | sim | Descrição curta do que o endpoint faz |
| `headers` | objeto | sim | Cabeçalhos da requisição. Use `{}` se não houver nenhum |
| `request` | objeto ou `null` | sim | Corpo da requisição. Use `null` para endpoints que não enviam body (ex: `GET`) |
| `response` | objeto ou array | sim | Exemplo de resposta de sucesso do endpoint |

## Resultado esperado

Ao escrever um bloco `api` corretamente, ele será renderizado como um componente interativo — não como código estático. O componente exibe o método HTTP com destaque de cor (verde para `POST`, azul para `GET`, vermelho para `DELETE`, etc.), a URL do endpoint, e a descrição resumida. Ao expandir, você vê os exemplos de `request` e `response` com destaque de sintaxe JSON.

No rodapé do componente há um botão **Testar** que dispara a requisição real para a URL informada e exibe o resultado diretamente na página. Caso a requisição falhe (erro de rede ou resposta HTTP de erro), uma mensagem de erro é exibida com o status retornado.

> **Atenção:** o botão Testar faz uma requisição real para a URL do endpoint. Evite usar URLs de produção com operações destrutivas (`DELETE`, `PUT`) em documentações compartilhadas com times que não estejam cientes disso.

## Exemplos

### GET — Listar recursos

Endpoints `GET` não enviam body, então `request` deve ser `null`.

~~~markdown
````api
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "description": "Retorna uma lista contendo todos os posts disponíveis.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat",
      "body": "quia et suscipit..."
    }
  ]
}
````
~~~

#### Resultado Esperado:

````api
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "description": "Retorna uma lista contendo todos os posts disponíveis.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat",
      "body": "quia et suscipit..."
    }
  ]
}
````

### GET — Buscar recurso por ID

~~~markdown
````api
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Retorna os dados de um post específico pelo seu ID.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat",
    "body": "quia et suscipit..."
  }
}
````
~~~

#### Resultado Esperado:

````api
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Retorna os dados de um post específico pelo seu ID.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat",
    "body": "quia et suscipit..."
  }
}
````

### POST — Criar recurso

~~~markdown
````api
{
  "method": "POST",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "description": "Cria um novo post.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "title": "Meu novo post",
    "body": "Conteúdo do post.",
    "userId": 1
  },
  "response": {
    "id": 101,
    "title": "Meu novo post",
    "body": "Conteúdo do post.",
    "userId": 1
  }
}
````
~~~

#### Resultado Esperado:

````api
{
  "method": "POST",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "description": "Cria um novo post.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "title": "Meu novo post",
    "body": "Conteúdo do post.",
    "userId": 1
  },
  "response": {
    "id": 101,
    "title": "Meu novo post",
    "body": "Conteúdo do post.",
    "userId": 1
  }
}
````

### PUT — Substituir recurso

~~~markdown
````api
{
  "method": "PUT",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Substitui todos os dados de um post existente.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "id": 1,
    "title": "Título atualizado",
    "body": "Conteúdo atualizado.",
    "userId": 1
  },
  "response": {
    "id": 1,
    "title": "Título atualizado",
    "body": "Conteúdo atualizado.",
    "userId": 1
  }
}
````
~~~

#### Resultado Esperado:

````api
{
  "method": "PUT",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Substitui todos os dados de um post existente.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "id": 1,
    "title": "Título atualizado",
    "body": "Conteúdo atualizado.",
    "userId": 1
  },
  "response": {
    "id": 1,
    "title": "Título atualizado",
    "body": "Conteúdo atualizado.",
    "userId": 1
  }
}
````

### PATCH — Atualizar campos específicos

~~~markdown
````api
{
  "method": "PATCH",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Atualiza apenas o título de um post existente.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "title": "Título parcialmente atualizado"
  },
  "response": {
    "id": 1,
    "title": "Título parcialmente atualizado",
    "body": "quia et suscipit...",
    "userId": 1
  }
}
````
~~~

#### Resultado Esperado:

````api
{
  "method": "PATCH",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Atualiza apenas o título de um post existente.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "title": "Título parcialmente atualizado"
  },
  "response": {
    "id": 1,
    "title": "Título parcialmente atualizado",
    "body": "quia et suscipit...",
    "userId": 1
  }
}
````

### DELETE — Remover recurso

Assim como `GET`, endpoints `DELETE` geralmente não enviam body — use `null` em `request`.

~~~markdown
````api
{
  "method": "DELETE",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Remove permanentemente um post pelo seu ID.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": {}
}
````
~~~

#### Resultado Esperado:

````api
{
  "method": "DELETE",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Remove permanentemente um post pelo seu ID.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": {}
}
````

## Boas práticas

**`description`** — escreva uma frase curta e objetiva descrevendo o que o endpoint faz e o que retorna. Evite repetir o método ou a URL na descrição.

**`request`** — use valores de exemplo realistas, não placeholders genéricos como `"string"` ou `0`. Quem vai consumir essa documentação precisa entender o formato esperado.

**`response`** — inclua um exemplo representativo da resposta real. Se a resposta for uma lista longa, pode incluir só 1 ou 2 itens — o suficiente pra mostrar a estrutura.

**JSON válido** — todos os campos precisam usar aspas duplas (`"`), não aspas simples (`'`). Vírgulas após o último campo de um objeto causam erro. Se o bloco aparecer com uma mensagem de "JSON malformado", verifique esses dois pontos primeiro.