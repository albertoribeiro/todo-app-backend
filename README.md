<!-- ABOUT THE PROJECT -->
## About The Project

This project is the backend API for the Todo List App, built using Express.js and Prisma, and it uses a MySQL database. 
The application is containerized with Docker and docker-compose is used to bring up both the API and the database.



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]

 

<!-- GETTING STARTED -->
## Getting Started



### Prerequisites

- Install [Node.js](https://nodejs.org/en/)
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

To stop and remove the containers, run:
```sh
docker-compose down -v
```
  
<!-- USAGE EXAMPLES -->