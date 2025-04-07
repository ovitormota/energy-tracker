# ⚡ Backend - Desafio Bolt  

Este projeto é um serviço backend desenvolvido em **Kotlin** com **Spring Boot** que realiza a extração, armazenamento e exposição de dados sobre geração de energia no Brasil.  

## 📌 Requisitos  

O sistema realiza as seguintes funções:  

1. **Download periódico** do arquivo CSV contendo os dados de geração de energia da ANEEL.  
2. **Armazenamento dos dados** no banco de dados **PostgreSQL**, garantindo normalização.  
3. **API RESTful** para listar os **5 maiores geradores de energia** do Brasil.  

## 🚀 Tecnologias Utilizadas  

- **Kotlin** - Linguagem principal do backend  
- **Spring Boot** - Framework para desenvolvimento da API  
- **Spring Data JPA** - Persistência de dados  
- **Hibernate** - ORM para facilitar a interação com o banco de dados  
- **PostgreSQL** - Banco de dados relacional  
- **Liquibase** - Controle de versionamento do banco de dados  
- **Maven** - Gerenciador de dependências e build  
- **Docker e Docker Compose** - Para orquestrar o banco de dados de forma rápida  

## ⚙️ Como Executar  

### 1️⃣ Pré-requisitos  

- **Java 17+** instalado  
- **Docker e Docker Compose** (caso queira rodar o banco via container)  

### 2️⃣ Subindo o Banco de Dados  

A forma mais fácil de rodar o banco de dados é com **Docker Compose**. Basta executar:  

```sh
docker-compose up -d
```

Isso iniciará um container com o **PostgreSQL** configurado conforme definido no arquivo `docker-compose.yml`.  

### 4️⃣ Rodando a Aplicação  

1. Clone o repositório:  

   ```sh
   git clone https://github.com/ovitormota/energytracker.git
   cd energytracker
   ```

2. Instale as dependências:  

   ```sh
   mvn clean install
   ```

3. Execute a aplicação:  

   ```sh
   mvn spring-boot:run
   ```

A API estará disponível em `http://localhost:8080`.  

## 🔄 Agendamento do Download do CSV  

O serviço está configurado para baixar o arquivo **ralie-usina.csv** periodicamente, processá-lo e armazenar os dados relevantes no banco.  

## 🛠 Endpoints da API  

- **`GET /energy-generators/top5`** → Retorna os **5 maiores geradores de energia** no Brasil.  

## 📝 Licença  

Este projeto é de uso livre sob a licença **MIT**.  

