// Get references to DOM elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const categorySelect = document.getElementById('task-category');
const todoList = document.getElementById('todo-list');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  const taskText = input.value.trim(); // Get task text input
  const taskCategory = categorySelect.value; // Get selected category
  if (taskText && taskCategory) {
    addTask(taskText, taskCategory); // Add the task with its category
    input.value = ''; // Clear input field
    categorySelect.selectedIndex = 0; // Reset the dropdown
  } else {
    alert('Please enter a task and select a category.');
  }
});

// Function to add a task with a category
function addTask(taskText, taskCategory) {
  const li = document.createElement('li'); // Create a new list item
  li.innerHTML = `
    <span><strong>${taskCategory}:</strong> ${taskText}</span>
    <div class="actions">
      <button class="check">✔</button>
      <button class="delete">✖</button>
    </div>
  `;

  // Add event listener for the check button (mark as complete)
  li.querySelector('.check').addEventListener('click', () => markAsComplete(li));
  // Add event listener for the delete button
  li.querySelector('.delete').addEventListener('click', () => li.remove());

  // Append the new task to the list
  todoList.appendChild(li);
}

// Function to mark a task as complete
function markAsComplete(taskItem) {
  taskItem.classList.toggle('completed'); // Toggle the "completed" class
}