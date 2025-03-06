const expres = require("express");
const router = expres.Router();
const TodoController = require("../controllers/todo.controller");

// Get all todos
router.get("/", TodoController.index);
// Create a new todo
router.post("/todos", TodoController.create);
// Toggle todo completion status
router.patch("/todos/:id/toggle", TodoController.toggle);
// Delete todo
router.delete("/todos/:id", TodoController.delete);
// Clear all completed todos
router.post("/todos/clear-completed", TodoController.clearCompleted);

module.exports = router;
