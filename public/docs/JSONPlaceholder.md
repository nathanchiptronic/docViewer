# API — JSONPlaceholder

Documentação de exemplo utilizando a API pública JSONPlaceholder.

Esta página é utilizada para testar a documentação de APIs e a execução das requisições diretamente pela interface.

---

## Listar posts

Retorna todos os posts disponíveis.

```api
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
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
    }
  ]
}
```

---

## Buscar post

Retorna os dados de um post específico.

```api
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Busca um post específico utilizando o identificador informado na URL.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  }
}
```

---

## Criar post

Cria um novo post.

```api
{
  "method": "POST",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "description": "Cria um novo post utilizando os dados enviados no corpo da requisição.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "title": "Meu novo post",
    "body": "Este é o conteúdo do meu novo post.",
    "userId": 1
  },
  "response": {
    "id": 101,
    "title": "Meu novo post",
    "body": "Este é o conteúdo do meu novo post.",
    "userId": 1
  }
}
```

---

## Atualizar post

Substitui os dados de um post existente.

```api
{
  "method": "PUT",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Atualiza completamente os dados de um post existente.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "id": 1,
    "title": "Post atualizado",
    "body": "Conteúdo atualizado do post.",
    "userId": 1
  },
  "response": {
    "id": 1,
    "title": "Post atualizado",
    "body": "Conteúdo atualizado do post.",
    "userId": 1
  }
}
```

---

## Atualizar parcialmente um post

Atualiza apenas os campos enviados no corpo da requisição.

```api
{
  "method": "PATCH",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Atualiza parcialmente um post existente sem a necessidade de enviar todos os seus campos.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "title": "Título atualizado"
  },
  "response": {
    "userId": 1,
    "id": 1,
    "title": "Título atualizado",
    "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  }
}
```

---

## Excluir post

Remove um post específico.

```api
{
  "method": "DELETE",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "description": "Remove o post identificado pelo ID informado na URL.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": {}
}
```

---

# Testes adicionais

## GET com URL longa

Utilizado para verificar o comportamento visual de URLs extensas dentro do Accordion.

```api
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts/1/comments",
  "description": "Retorna todos os comentários relacionados ao post informado.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": [
    {
      "postId": 1,
      "id": 1,
      "name": "id labore ex et quam laborum",
      "email": "Eliseo@gardner.biz",
      "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi"
    }
  ]
}
```

---

## GET com resposta vazia

Utilizado para testar respostas que não possuem itens.

```api
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts/999/comments",
  "description": "Busca os comentários de um post que não possui comentários cadastrados.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": null,
  "response": []
}
```

---

## POST com corpo maior

Utilizado para testar a renderização de corpos de requisição maiores.

```api
{
  "method": "POST",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "description": "Cria um novo post contendo diversos campos para testar a renderização do corpo da requisição.",
  "headers": {
    "Content-Type": "application/json"
  },
  "request": {
    "title": "Documentação de API",
    "body": "Este é um exemplo de conteúdo utilizado para testar a documentação de APIs dentro do sistema. O objetivo é verificar como o componente de código se comporta quando recebe uma quantidade maior de informações.",
    "userId": 10,
    "metadata": {
      "category": "documentation",
      "published": true,
      "tags": [
        "api",
        "documentation",
        "test"
      ]
    }
  },
  "response": {
    "id": 101,
    "title": "Documentação de API",
    "body": "Este é um exemplo de conteúdo utilizado para testar a documentação de APIs dentro do sistema.",
    "userId": 10,
    "metadata": {
      "category": "documentation",
      "published": true,
      "tags": [
        "api",
        "documentation",
        "test"
      ]
    }
  }
}
```

---

# Fluxo esperado

Cada requisição deve ser apresentada inicialmente de forma compacta:

**Método + URL + descrição**

Ao expandir:

1. Descrição completa
2. Request
3. Response esperada
4. Botão para testar a requisição

Após implementar o teste, o resultado real da requisição poderá ser apresentado abaixo da resposta esperada.