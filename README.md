<!-- ABOUT THE PROJECT -->
## About The Project

This project is the backend API for the Todo List App, built using Express.js and Prisma, and it uses a MySQL database. 
The application is containerized with Docker and docker-compose is used to bring up both the API and the database.

 
<!-- GETTING STARTED -->
## Getting Started



### Prerequisites

- Install [Node.js](https://nodejs.org/en/)
- node v18.19.1 (npm v10.2.4)
- Create a MySQL data base, try with [docker](https://medium.com/@maravondra/mysql-in-docker-d7bb1e304473) 

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/albertoribeiro/todo-app-backend.git
   ```
2. Install NPM packages
   ```sh
   cd todo-app-backend
   npm install
   ```
3. Enter your DATABASE_URL and PORT in `.env` file
   ```sh
   PORT=3001
   DATABASE_URL="mysql://<user>:<password>@database:3306/<data_base>"
   ```
4. Generate the Prisma client
   ```sh
   npx prisma generate
   ```
5. Run Prisma migrations
   ```sh
   npx prisma migrate dev
   ```
6. Start the API
   ```sh
   npm run dev 
   ```
#### Docker
  You could run the aplication in a container:

  Running with Docker Compose
  ```sh
  docker-compose up --build
  ```

  This command will:
- Build the API image
- Start the MySQL container
- Execute Prisma migrations (using "npx prisma migrate deploy")
- Start the API (using "npm start")

The API is available at: http://localhost:3001

To stop and remove the containers, run:
```sh
docker-compose down -v
```

### Tests
To run the tests:
```sh
npm test
```

### SWAGGER
Documentation is available for the development environment at http://localhost:3001/docs/.