let draggedItem = null;

function addTask() {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText);
  document.getElementById("todo-list").appendChild(li);
  taskInput.value = "";

  saveData();
  showToast("Tarea agregada ✅");
}

function createTaskElement(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.setAttribute("draggable", "true");
  li.ondragstart = dragStart;
  applyTags(li);
  return li;
}

function applyTags(li) {
  const text = li.textContent.toLowerCase();
  if (text.includes("#urgente")) li.style.backgroundColor = "#e74c3c";
  else if (text.includes("#personal")) li.style.backgroundColor = "#f39c12";
  else if (text.includes("#trabajo")) li.style.backgroundColor = "#27ae60";
}

function dragStart(e) {
  draggedItem = e.target;
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (draggedItem && e.target.classList.contains("task-list")) {
    e.target.appendChild(draggedItem);
    draggedItem = null;
    saveData();
    showToast("Tarea movida 🔄");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function saveData() {
  const lists = ["todo-list", "in-progress-list", "done-list"];
  const data = lists.map(id => {
    const items = Array.from(document.getElementById(id).children);
    return items.map(li => li.textContent);
  });
  localStorage.setItem("taskflow", JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("taskflow"));
  if (!data) return;
  ["todo-list", "in-progress-list", "done-list"].forEach((id, idx) => {
    const ul = document.getElementById(id);
    ul.innerHTML = "";
    data[idx].forEach(text => {
      const li = createTaskElement(text);
      ul.appendChild(li);
    });
  });
}

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
}

window.onload = () => {
  loadTheme();
  loadData();
};
