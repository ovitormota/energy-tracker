# Energy Tracker - Desafio Bolt

Este projeto tem como objetivo processar e analisar dados de geração de energia no Brasil, extraindo informações de um arquivo CSV público e armazenando-as em um banco de dados relacional. A aplicação backend expõe uma API REST para consultar os maiores geradores de energia, enquanto o frontend apresenta essas informações de forma visual.

## Tecnologias Utilizadas

### Backend
- Kotlin
- Spring Boot
- JPA/Hibernate
- PostgreSQL
- Liquibase
- Docker
- Maven

### Frontend
- React
- TypeScript
- Vite
- MUI

## Funcionalidades
1. **Job de Extração**: Um serviço agendado baixa periodicamente o arquivo CSV contendo dados de geração de energia.
2. **Persistência**: Os dados extraídos são normalizados e armazenados em um banco de dados PostgreSQL.
3. **API REST**: Disponibiliza endpoints para consulta dos 5 maiores geradores de energia no Brasil.
4. **Frontend**: Interface para exibição dos dados processados.

## Como Executar

### Subindo o Banco de Dados
Na raiz do backend, utilize Docker Compose para subir o banco de dados:

```sh
docker-compose up -d
```

### Executando o Backend
```sh
cd backend
mvn spring-boot:run
```

### Executando o Frontend
```sh
cd frontend
npm install
npm run dev
```
