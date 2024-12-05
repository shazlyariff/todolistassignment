// Add a new category
document.getElementById('addCategoryButton').addEventListener('click', function () {
  const newCategoryInput = document.getElementById('newCategoryInput');
  const newCategoryName = newCategoryInput.value.trim();

  if (newCategoryName) {
    // Add to the category dropdown
    const categorySelect = document.getElementById('categorySelect');
    const option = document.createElement('option');
    option.value = newCategoryName;
    option.textContent = newCategoryName;
    categorySelect.appendChild(option);

    // Clear the input field
    newCategoryInput.value = '';
  } else {
    alert('Please enter a category name.');
  }
});

// Add a new task
document.getElementById('addTaskButton').addEventListener('click', function () {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  const categorySelect = document.getElementById('categorySelect');
  const selectedCategory = categorySelect.value;

  if (taskText) {
    // Create a new task element
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <span class="category-text">Category: ${selectedCategory || 'None'}</span>
      <div class="actions">
        <button class="check-task">✔</button>
        <button class="edit-task">Edit</button>
        <button class="delete-task">X</button>
      </div>
    `;

    // Add the task to the list
    const taskList = document.getElementById('taskList');
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';

    // Mark the task as complete
    li.querySelector('.check-task').addEventListener('click', function () {
      const taskTextElement = li.querySelector('.task-text');
      taskTextElement.style.textDecoration =
        taskTextElement.style.textDecoration === 'line-through' ? '' : 'line-through';
    });

    // Edit the task
    li.querySelector('.edit-task').addEventListener('click', function () {
      const taskTextElement = li.querySelector('.task-text');
      const editButton = this;

      if (editButton.textContent === 'Edit') {
        // Switch to edit mode
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskTextElement.textContent;
        input.className = 'edit-input';
        li.replaceChild(input, taskTextElement);
        editButton.textContent = 'Save';
      } else {
        // Save the edited task
        const input = li.querySelector('.edit-input');
        const updatedTaskText = input.value.trim();

        if (updatedTaskText) {
          const updatedTaskTextElement = document.createElement('span');
          updatedTaskTextElement.textContent = updatedTaskText;
          updatedTaskTextElement.className = 'task-text';
          li.replaceChild(updatedTaskTextElement, input);
          editButton.textContent = 'Edit';
        } else {
          alert('Task cannot be empty.');
        }
      }
    });

    // Delete the task
    li.querySelector('.delete-task').addEventListener('click', function () {
      li.remove();
    });
  } else {
    alert('Please enter a task.');
  }
});

// DOM elements
const addWeatherBtn = document.getElementById('get-weather-btn');
const announcement = document.getElementById('announcement');

// Button to start fetching weather information
addWeatherBtn.addEventListener('click', getWeatherInfo);

// Function to fetch weather info and manipulate DOM
// element ,announcement, for user to see
function getWeatherInfo() {
  announcement.innerHTML = '';

  let promise = getWeatherForecast(); // Calling async API GET function 
  promise.then(resolve, reject); // Begin processing only after data are ready
  function resolve(json) {
    const records = json.data.records[0];
    const general = json.data.records[0].general;
    const date = records.date.split('-');
    const lowTemp = general.temperature.low;
    const highTemp = general.temperature.high;
    const forecast = general.forecast.text;
    const timestamp = records.updatedTimestamp.substring(11, 19);

    announcement.innerHTML = `<td>${forecast}<br/><br/></td>`;
    announcement.innerHTML += `<td>Date </td><td>${date[2]}-${date[1]}-${date[0]} <br/></td>`
    announcement.innerHTML += `<td>Low </td><td>${lowTemp} C<br/></td>`;
    announcement.innerHTML += `<td>High </td><td>${highTemp} C<br/><br/></td>`;
    announcement.innerHTML += `<td>Updated at </td><td>${timestamp}<br/></td>`;

  }
  // Reject get called if the is an issue in the API call
  function reject(reason) {
    console.log("Couldn't get the records! Reason: " + reason);
  }
}

// async API GET function specific URL
async function getWeatherForecast() {
  const url = 'https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast';

  // When an error encountered, system will log it under error.
  try {
    const response = await fetch(url);
    const data = await response.json();
    return await data;
  } catch (error) {
    console.error(error);
  }
}
