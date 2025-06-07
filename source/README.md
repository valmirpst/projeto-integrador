# Projeto Integrador - API Livraria

Esta é a API do Projeto Integrador (M34 - 2025), responsável pelo gerenciamento de livros, usuários, históricos de empréstimos e cursos de uma biblioteca acadêmica.

## Funcionalidades

- Cadastro, consulta, atualização e remoção de **livros**
- Gerenciamento de **usuários** (alunos, professores, bibliotecários)
- Controle de **histórico** de empréstimos e devoluções
- Cadastro e consulta de **cursos**
- Filtros e buscas avançadas

## Tecnologias

- Node.js + Express
- PostgreSQL
- Swagger (OpenAPI 3.0) para documentação interativa

## Como rodar

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente** no arquivo `.env`:

   ```
   PORT=3333
   POSTGRES_URL=postgres://postgres:postgres@localhost:5432/projeto_integrador
   ```

3. **Inicie o banco de dados PostgreSQL** e crie o banco `projeto_integrador`.

4. **Inicie o servidor:**

   ```bash
   npm run dev
   ```

5. **Acesse a documentação Swagger:**  
   [http://localhost:3333/docs](http://localhost:3333/docs)

---

## Documentação Swagger

A API possui documentação interativa gerada automaticamente via Swagger.

- Visualize todos os endpoints, parâmetros e exemplos de resposta
- Teste requisições diretamente pelo navegador

Você também pode acessar o JSON da especificação em:  
[http://localhost:3333/docs.json](http://localhost:3333/docs.json)

---

## Estrutura de Pastas

```
src/
  controllers/  # Lógica dos endpoints
  core/         # Configurações do banco e respostas
  models/       # Modelos, entidades e schemas de validação
  routes/       # Rotas da API
  swagger/      # Configuração do Swagger
```

---

## Membros do Grupo

- **Aluno 1**: Valmir Paiva Stachin - [GitHub](https://github.com/valmirpst)
- **Aluno 2**: Matheus Teodoro Garcia - [GitHub](https://github.com/matheustg)
- **Aluno 3**: Amanda Soares Vieira - [GitHub](https://github.com/amandasoaresv)
