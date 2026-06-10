# Clínica CRUD

Este projeto é uma aplicação de gestão básica para uma clínica médica. Ele reúne:

- um backend em Python com FastAPI, que expõe APIs REST para médicos, pacientes e agendamentos;
- um frontend em React com Vite, que consome essas APIs e oferece interface para cadastro, listagem e exclusão.

## Tecnologias usadas

- Backend: Python, FastAPI, Uvicorn, MySQL
- Frontend: React, Vite, Axios, React Router DOM

## Estrutura do projeto

- `backend/`
  - `main.py`: ponto de entrada da API FastAPI
  - `database.py`: conexão MySQL
  - `models.py`: modelos Pydantic para validação de dados
  - `routes/`: rotas separadas para `medicos`, `pacientes` e `agendamentos`
- `frontend/`
  - `src/`: código do aplicativo React
  - `src/pages/`: páginas de gerenciamento de médicos, pacientes e agendamentos
  - `src/services/`: arquivos de serviço Axios para acesso à API

## Requisitos

- Python 3.14+ (ou versão compatível)
- Node.js 18+ e npm
- MySQL configurado e rodando localmente

## Configuração do banco de dados

O backend espera uma base MySQL com as tabelas principais já existentes. As tabelas usadas são:

- `medicos`
- `pacientes`
- `agendamentos`

### Exemplo de esquema mínimo

```sql
CREATE TABLE medicos (
  idMedico INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  especialidade VARCHAR(255) NOT NULL,
  telefone VARCHAR(50) NOT NULL
);

CREATE TABLE pacientes (
  idPaciente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(50) NOT NULL,
  data_nascimento DATE
);

CREATE TABLE agendamentos (
  idAgendamento INT AUTO_INCREMENT PRIMARY KEY,
  idPaciente INT NOT NULL,
  idMedico INT NOT NULL,
  data_consulta DATE NOT NULL,
  hora_consulta TIME NOT NULL,
  FOREIGN KEY (idPaciente) REFERENCES pacientes(idPaciente),
  FOREIGN KEY (idMedico) REFERENCES medicos(idMedico)
);
```

A conexão é definida em `backend/database.py`. Ajuste `host`, `user`, `password` e `database` conforme seu ambiente.

## Como rodar o backend

Entre na pasta `backend` e execute o servidor com o Python do ambiente virtual:

```powershell
# a partir da raiz do projeto
cd d:\crud
.\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 5000
```

O backend ficará disponível em `http://localhost:5000`.

### Endpoints principais

- `GET /medicos`
- `POST /medicos`
- `DELETE /medicos/{id}`
- `GET /pacientes`
- `POST /pacientes`
- `DELETE /pacientes/{id}`
- `GET /agendamentos`
- `POST /agendamentos`
- `DELETE /agendamentos/{id}`

## Como rodar o frontend

Entre na pasta `frontend`, instale dependências e inicie o servidor Vite:

```powershell
cd d:\crud\frontend
npm install
npm run dev
```

Depois abra no navegador o endereço exibido pelo Vite, geralmente `http://localhost:5173`.
