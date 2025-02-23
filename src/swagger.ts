import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import express from "express";  

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description: "API for managing todo tasks",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            title: { type: "string", example: "Buy groceries" },
            color: { type: "string", example: "blue" },
            completed: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["id", "title", "completed", "createdAt", "updatedAt"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};


const specs = swaggerJsdoc(options);
  
const setupSwagger = (app: express.Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
 
export default setupSwagger;
