import request from "supertest";
import app from "../app";

let createdTaskId: string;

describe("Tasks API", () => {
  describe("GET /tasks", () => {
    it("should return an array", async () => {
      const response = await request(app).get("/tasks");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const newTask = { title: "New Task", color: "blue" };
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.title).toBe(newTask.title);
      createdTaskId = response.body.id;
    });

    it("should not create a task without title", async () => {
      const taskWithoutTitle = { color: "red" };
      const response = await request(app).post("/tasks").send(taskWithoutTitle);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update an existing task", async () => {
      const updatedTask = {
        title: "Updated Task",
        color: "green",
        completed: true,
      };
      const response = await request(app)
        .put(`/tasks/${createdTaskId}`)
        .send(updatedTask);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedTask.title);
      expect(response.body.completed).toBe(true);
    });

    it("should return 404 when updating a non-existent task", async () => {
      const response = await request(app)
        .put("/tasks/999")
        .send({ title: "Task Test" });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });

    it("should not update with invalid data (empty title)", async () => {
      const response = await request(app)
        .put(`/tasks/${createdTaskId}`)
        .send({ title: "" });
      expect(response.status).toBe(400); 
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete an existing task", async () => {
      const response = await request(app).delete(`/tasks/${createdTaskId}`);
      expect(response.status).toBe(200);
      const checkResponse = await request(app).get(`/tasks/${createdTaskId}`);
      expect(checkResponse.status).toBe(404);
    });
  });
});
