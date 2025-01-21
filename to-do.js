const addButton = document.getElementById('add-button');
const toDoDisplay = document.getElementById('to-do-display');
const alphSortButton = document.getElementById('alph-sort');
const dateSortButton = document.getElementById('date-sort');
const prioritySortButton = document.getElementById('priority');
let toDoItems = [];

function displayToDoItems(sortMethod) {
  toDoDisplay.innerHTML = ''; // Clear existing to-do items

  let sortedItems = [...toDoItems]; 

  switch (sortMethod) {
    case 'date':
        sortedItems.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      break;
    case 'priority':
        sortedItems.sort((a, b) => {
            if (a.priority === b.priority) {
              return a.task.localeCompare(b.task); 
            } else {
              return a.priority - b.priority; 
            }
          });
      break;
    default:
        sortedItems.sort((a, b) => a.task.localeCompare(b.task));
      break;
  } 

  sortedItems.forEach((item, index) => {
    const toDoItemElement = document.createElement('div');
    toDoItemElement.classList.add('to-do-item');

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox-input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.isCompleted; 
    toDoItemElement.appendChild(checkbox);

    const taskNameSpan = document.createElement('span');
    taskNameSpan.classList.add('task-name');
    taskNameSpan.textContent = item.task;
    toDoItemElement.appendChild(taskNameSpan);

    const dateAddedSpan = document.createElement('span');
    dateAddedSpan.classList.add('date-added');
    dateAddedSpan.textContent = `Added: ${item.dateAdded}`;
    toDoItemElement.appendChild(dateAddedSpan);

    const prioritySpan = document.createElement('span');
    prioritySpan.classList.add('priority');
    prioritySpan.textContent = `Priority: ${item.priority}`;
    toDoItemElement.appendChild(prioritySpan);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-task-button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      toDoItems.splice(index, 1); 
      displayToDoItems(sortMethod); 
    });
    toDoItemElement.appendChild(removeButton);

    toDoDisplay.appendChild(toDoItemElement);
  });
}

addButton.addEventListener('click', () => {
  // Get input from the user
  const taskName = prompt('Enter task name:');
  const priority = prompt('Enter priority (1 = Highest | 5 = Lowest):');

  // Create a new to-do item object
  const currentDateAndTime = new Date();
  const newItem = {
    task: taskName,
    dateAdded: currentDateAndTime.toLocaleString(),
    priority: priority,
    isCompleted: false 
  };

  // Add the new to-do item to the toDoItems array
  toDoItems.push(newItem);

  // Call the function to display the updated list
  displayToDoItems('alphabetical'); 
});

alphSortButton.addEventListener('click', () => {
    displayToDoItems('alphabetical'); 
  });
  
dateSortButton.addEventListener('click', () => {
    displayToDoItems('date'); 
  });
  
prioritySortButton.addEventListener('click', () => {
    displayToDoItems('priority'); 
  });

// Initial display (if any to-do items exist initially)
displayToDoItems();