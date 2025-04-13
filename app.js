function addTask() {
  const taskInput = document.getElementById('new-task');
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement('li');
    li.textContent = taskText;
    li.onclick = () => moveTask(li, 'in-progress-list');
    document.getElementById('todo-list').appendChild(li);
    taskInput.value = "";
    saveTasks();
  }
}

function moveTask(taskElement, targetListId) {
  const targetList = document.getElementById(targetListId);
  if (targetListId === 'done-list') {
    taskElement.onclick = () => taskElement.remove();
  } else if (targetListId === 'in-progress-list') {
    taskElement.onclick = () => moveTask(taskElement, 'done-list');
  }
  targetList.appendChild(taskElement);
  saveTasks();
}

function saveTasks() {
  const states = ['todo-list', 'in-progress-list', 'done-list'];
  const data = {};
  states.forEach(id => {
    const items = document.getElementById(id).children;
    data[id] = Array.from(items).map(li => li.textContent);
  });
  localStorage.setItem('taskflow-data', JSON.stringify(data));
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem('taskflow-data'));
  if (!data) return;
  for (let list in data) {
    data[list].forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      if (list === 'todo-list') {
        li.onclick = () => moveTask(li, 'in-progress-list');
      } else if (list === 'in-progress-list') {
        li.onclick = () => moveTask(li, 'done-list');
      } else {
        li.onclick = () => li.remove();
      }
      document.getElementById(list).appendChild(li);
    });
  }
}

window.onload = loadTasks;