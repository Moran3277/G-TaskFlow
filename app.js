function createTaskElement(text, stage) {
  const li = document.createElement('li');
  li.classList.add('task');
  li.textContent = text;

  const button = document.createElement('button');
  button.className = 'action-button';

  if (stage === 'todo-list') {
    button.textContent = '▶️';
    button.onclick = () => moveTask(li, 'in-progress-list');
  } else if (stage === 'in-progress-list') {
    button.textContent = '✅';
    button.onclick = () => moveTask(li, 'done-list');
  } else {
    button.textContent = '🗑️';
    button.onclick = () => {
      li.remove();
      saveTasks();
    };
  }

  li.appendChild(button);
  return li;
}

function addTask() {
  const taskInput = document.getElementById('new-task');
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = createTaskElement(taskText, 'todo-list');
    document.getElementById('todo-list').appendChild(li);
    taskInput.value = "";
    saveTasks();
  }
}

function moveTask(taskElement, targetListId) {
  const text = taskElement.firstChild.textContent;
  const li = createTaskElement(text, targetListId);
  document.getElementById(targetListId).appendChild(li);
  taskElement.remove();
  saveTasks();
}

function saveTasks() {
  const lists = ['todo-list', 'in-progress-list', 'done-list'];
  const data = {};
  lists.forEach(id => {
    const items = document.getElementById(id).children;
    data[id] = Array.from(items).map(li => li.firstChild.textContent);
  });
  localStorage.setItem('taskflow-data', JSON.stringify(data));
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem('taskflow-data'));
  if (!data) return;

  for (let list in data) {
    data[list].forEach(text => {
      const li = createTaskElement(text, list);
      document.getElementById(list).appendChild(li);
    });
  }
}

window.onload = loadTasks;