# Desafio Desenvolvedor Fullstack

Projeto simples de casa de apostas com backend em Node.js e frontend estático em HTML, CSS e JavaScript.

---

## Estrutura do projeto

```
/desafio-vtx
├── backend/ # Backend Node.js (API RESTful e servidor estático)
│ ├── index.js
│ └──  package.json
│
├── frontend/ # Frontend estático (HTML, CSS, JS)
│ ├── index.html
│ ├── styles.css
│ └──  script.js
│
├── .gitignore
└── README.md
```

---

## Requisitos

- Node.js
- npm

---

## Como executar o projeto

1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd desafio-vtx/backend
```

2. Instale as dependências do backend

```bash
npm install
```

3. Inicie o servidor backend (que também serve o frontend)
```bash
node index.js
```

4. Abra no navegador
```bash
http://localhost:3333
```

## Funcionalidades
Listagem de eventos esportivos mockados

Visualização de odds para cada evento

Seleção de apostas com cálculo de retorno possível

Carrinho de apostas para múltiplas seleções com cálculo total

Remoção de apostas do carrinho

## API disponível
GET /events — retorna a lista de eventos com times e odds
##

Projeto criado para teste técnico de desenvolvedor fullstack.
