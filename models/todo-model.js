const prisma = require("../config/db");

const TodoModel = {
  // Get all todos
  getAllTodos: async () => {
    return await prisma.todo.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  },
  // Get active todos
  getActiveTodos: async () => {
    return await prisma.todo.findMany({
      where: {
        completed: false,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  },
  // Get completed todos
  getCompletedTodos: async () => {
    return await prisma.todo.findMany({
      where: {
        completed: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  },
  // Create a new todo
  createTodo: async (task) => {
    return await prisma.todo.create({
      data: {
        task,
      },
    });
  },
  // Toggle todo completion status
  toggleTodo: async (id) => {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number.parseInt(id),
      },
    });

    return await prisma.todo.update({
      where: {
        id: Number.parseInt(id),
      },
      data: {
        completed: !todo.completed,
      },
    });
  },
  // Update todo
  updateTodo: async (id, data) => {
    return await prisma.todo.update({
      where: {
        id: Number.parseInt(id),
      },
      data,
    });
  },
  // Delete todo
  deleteTodo: async (id) => {
    return await prisma.todo.delete({
      where: {
        id: Number.parseInt(id),
      },
    });
  },
  // Clear all completed todos
  clearCompleted: async () => {
    return await prisma.todo.deleteMany({
      where: {
        completed: true,
      },
    });
  },
};

module.exports = TodoModel;
