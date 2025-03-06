const TodoModel = require("../models/todo-model");

const TodoController = {
  // Render home page with all todos
  index: async (req, res) => {
    try {
      const filter = req.query.filter || "all";
      let todos;

      switch (filter) {
        case "active":
          todos = await TodoModel.getActiveTodos();
          break;
        case "completed":
          todos = await TodoModel.getCompletedTodos();
          break;
        default:
          todos = await TodoModel.getAllTodos();
          break;
      }

      const activeCount = (await TodoModel.getActiveTodos()).length;

      res.render("index", {
        todos,
        activeCount,
        filter,
      });
    } catch (error) {
      console.log("Error fetchingn todos:", error);
      res.status(500).send({ message: error.message });
    }
  },

  //   Create a new todo
  create: async (req, res) => {
    try {
      const { task } = req.body;
      if (!task || task.trim() === "") {
        req.flash("error", "Task cannot be empty");
        return res.redirect("/");
      }

      await TodoModel.createTodo(task);
      req.flash("success", "Todo created successfully");
      res.redirect("/");
    } catch (error) {
      console.error("Error creating todo:", error);
      req.flash("error", "Failed to create todo");
      res.redirect("/");
    }
  },

  //   Toggle todo completion status
  toggle: async (req, res) => {
    try {
      const { id } = req.params;
      await TodoModel.toggleTodo(id);
      req.flash("success", "Todo status updated");
      res.redirect("/");
    } catch (error) {
      console.error("Error toggling todo:", error);
      req.flash("error", "Error updating todo status");
      res.redirect("/");
      //   res.status(500).send("Server error");
    }
  },

  //   Delete todo
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await TodoModel.deleteTodo(id);
      req.flash("success", "Todo deleted successfully");
      res.redirect("/");
    } catch (error) {
      console.error("Error deleting todo:", error);
      req.flash("error", "Failed to delete todo");
      res.redirect("/");
      //   res.status(500).send("Server error");
    }
  },

  //   Clear all completed todos
  clearCompleted: async (req, res) => {
    try {
      await TodoModel.clearCompleted();
      req.flash("success", "Completed todos cleared");
      res.redirect("/");
    } catch (error) {
      console.error("Error clearing completed todos:", error);
      req.flash("error", "Failed to clear completed todos");
      res.redirect("/");
    }
  },
};

module.exports = TodoController;
