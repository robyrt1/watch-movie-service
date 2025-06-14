# Movie Service API

API robusta para gerenciamento e streaming de conteúdo de vídeo, construída com NestJS e seguindo os princípios da Arquitetura Limpa (Clean Architecture).

##

Este projeto é construído seguindo os princípios da **Arquitetura Limpa (Clean Architecture)** e do **Domain-Driven Design (DDD)**, garantindo uma clara separação de responsabilidades, alta testabilidade e manutenibilidade.

A separação de responsabilidades é alcançada com o padrão **CQRS (Command Query Responsibility Segregation)**, dividindo as operações de escrita (Commands) e leitura (Queries) para otimizar e escalar cada fluxo de forma independente.

A estrutura de pastas reflete essas escolhas arquiteturais:

  - **`src/`**
      - **`application/`**: Camada de Aplicação. Orquestra os casos de uso da aplicação.
          - `commands/`: Lógica para operações de escrita (Criação, Atualização, Deleção).
          - `queries/`: Lógica para operações de leitura (Busca de dados).
          - `dtos/`: Data Transfer Objects para comunicação entre camadas.
      - **`domain/`**: Camada de Domínio. Contém a lógica de negócio principal, entidades de domínio e regras que são independentes de qualquer tecnologia externa.
      - **`infrastructure/`**: Camada de Infraestrutura. Contém as implementações concretas de tecnologias externas.
          - `http/`: Lógica relacionada ao protocolo HTTP (Guards, etc).
          - `observability/`: Configuração de OpenTelemetry para tracing com Jaeger.
          - `persistence/`: Lógica de persistência de dados (Repositórios, Entidades de banco de dados).
          - `services/`: Integrações com serviços de terceiros (ex: AWS S3).
      - **`interfaces/`**: Camada de Interface. Ponto de entrada da aplicação.
          - `http/`: Controllers e DTOs específicos para as requisições HTTP.

## ✨ Recursos

  - CRUD completo para gerenciamento de filmes.
  - Upload de vídeos para o Amazon S3 usando URLs Pré-Assinadas.
  - Transcodificação de vídeo automática para streaming HLS com AWS Elemental MediaConvert.
  - Autenticação e autorização de rotas com JWT.
  - Observabilidade e tracing distribuído com **OpenTelemetry** e **Jaeger**.

## 🚀 Começando

Siga as instruções abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

  - Node.js (v18 ou superior)
  - NPM ou Yarn
  - Docker e Docker Compose
  - Uma conta AWS com credenciais configuradas

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/robyrt1/watch-movie-service.git
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto, baseado no `.env.example` (se houver).

    ```.env
    # Database
DATABASE_HOST=
DATABASE_PORT=5432
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1h

# Jaeger
JAEGER_AGENT_HOST=
JAEGER_AGENT_PORT=


# Rabbitmq
RABBITMQ_HOST=
RABBITMQ_PORT=
RABBITMQ_USER=
RABBITMQ_PASSWORD=
RABBITMQ_QUEUE=

# Tracing
OTEL_SERVICE_NAME=
    ```

### Rodando a Aplicação

1.  Rode a aplicação NestJS em modo de desenvolvimento:

    ```bash
    npm run start:dev
    ```

A aplicação estará disponível em `http://localhost:{port}}`.

## 🧪 Testes

Para rodar os testes unitários da aplicação, use o seguinte comando:

```bash
npm run test
```

## 📡 Endpoints da API

Abaixo estão os endpoints principais disponíveis nesta API, baseados na inicialização do serviço.

| Método | Rota                     | Descrição                                         |
| :----- | :----------------------- | :------------------------------------------------ |
| `POST` | `/movies`                | Cria um novo filme no banco de dados.             |
| `POST` | `/movies/upload-request` | Solicita uma URL pré-assinada para upload no S3.  |
| `GET`  | `/movies`                | Lista todos os filmes.                            |
| `GET`  | `/movies/:id`            | Busca um filme específico pelo seu ID.            |

## 🛠️ Tecnologias Utilizadas

  - **Backend:** NestJS, TypeScript
  - **Banco de Dados:** PostgreSQL, TypeORM
  - **Autenticação:** Passport.js, JWT
  - **Cloud:** AWS S3, AWS Elemental MediaConvert, AWS Lambda, Amazon RDS
  - **Observabilidade:** OpenTelemetry, Jaeger
