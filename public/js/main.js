document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todo-list");
  let draggedItem = null;

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Check for saved theme preference, otherwise use system preference
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  // Apply the initial theme
  if (savedTheme === "dark") {
    html.classList.add("dark");
    updateThemeIcon(true);
  } else {
    html.classList.remove("dark");
    updateThemeIcon(false);
  }

  themeToggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);
  });

  function updateThemeIcon(isDark) {
    themeToggle.innerHTML = isDark
      ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>`;
  }

  // Drag and drop functionality
  if (todoList) {
    Array.from(todoList.children).forEach((item) => {
      if (item.tagName === "LI") {
        setupDragAndDrop(item);
      }
    });
  }

  function setupDragAndDrop(item) {
    item.setAttribute("draggable", "true");

    item.addEventListener("dragstart", function () {
      draggedItem = this;
      setTimeout(() => {
        this.classList.add("opacity-50");
      }, 0);
    });

    item.addEventListener("dragend", function () {
      draggedItem = null;
      this.classList.remove("opacity-50");
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    item.addEventListener("dragenter", function (e) {
      e.preventDefault();
      this.classList.add("bg-gray-100", "dark:bg-gray-700/50");
    });

    item.addEventListener("dragleave", function () {
      this.classList.remove("bg-gray-100", "dark:bg-gray-700/50");
    });

    item.addEventListener("drop", function (e) {
      e.preventDefault();
      this.classList.remove("bg-gray-100", "dark:bg-gray-700/50");

      if (draggedItem !== this) {
        const allItems = Array.from(todoList.children);
        const draggedIndex = allItems.indexOf(draggedItem);
        const droppedIndex = allItems.indexOf(this);

        if (draggedIndex < droppedIndex) {
          todoList.insertBefore(draggedItem, this.nextSibling);
        } else {
          todoList.insertBefore(draggedItem, this);
        }

        // console.log(
        //   "New order:",
        //   Array.from(todoList.children).map((item) => item.dataset.id)
        // );
      }
    });
  }
});
