# CRUD-TRABALHO

- **Backend**: Node.js com MySQL  
- **Frontend**: React

Instruções para rodar o projeto localmente:

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

---

Rodar o Backend
Entre na pasta do backend, instale as dependências e inicie o servidor:

- cd backend
- npm install
- npm start

⚙️ Configuração do Banco de Dados

Antes de rodar o backend, configure o acesso ao seu banco MySQL.
Abra o arquivo backend/Routes/db.js e edite com suas credenciais:

const db = mysql.createConnection({
  host: "localhost",
  user: "SEU_USUARIO",
  password: "SUA_SENHA",
  database: "NOME_DO_BANCO"
});

O backend estará disponível em:
📍 http://localhost:8800

Rodar o Frontend
Abra um novo terminal na raiz do projeto e execute:

- cd frontend
- npm install
- npm start

