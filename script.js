// Select DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task
addTaskBtn.addEventListener('click', addTask);

// Add task functionality
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  // Create task element
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Mark as completed on click
  li.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
      e.target.classList.toggle('task-completed');
    }
  });

  // Delete task on button click
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  // Append task to list
  taskList.appendChild(li);

  // Save tasks to localStorage
  saveTasks();

  // Clear input
  taskInput.value = '';
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach((li) => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.querySelector('span').classList.contains('task-completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'task-completed' : ''}">${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    li.addEventListener('click', (e) => {
      if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('task-completed');
      }
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  });
}
