const addButton = document.getElementById('add-button');
const toDoDisplay = document.getElementById('to-do-display');
const alphSortButton = document.getElementById('alph-sort');
const dateSortButton = document.getElementById('date-sort');
const prioritySortButton = document.getElementById('priority');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');
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
    checkbox.checked = item.isCompleted; // Set the checkbox state based on the item's isCompleted property
    checkbox.addEventListener('change', () => {
      item.isCompleted = checkbox.checked; // Update the item's isCompleted property directly
      displayToDoItems(sortMethod); 
    });
    toDoItemElement.appendChild(checkbox)

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

// Function to save to-do items to a JSON file
function saveToDoItems() {
    const data = JSON.stringify(toDoItems);
    const today = new Date();
  
    // Get day, month, and year components
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = today.getFullYear();
  
    // Get hours and minutes in 24-hour format
    let hours = today.getHours();
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format
  
    // Create filename with day-month-year_hour:minute format
    const filename = `to_do_list_${day}-${month}-${year}_${hours}-${minutes}.json`; 
  
    try {
      const file = new Blob([data], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();
    } catch (error) {
      console.error('Error saving to-do items:', error);
    }
  }
  
  // Function to load to-do items from a JSON file
  function loadToDoItems() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
  
    input.addEventListener('change', () => {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        try {
          toDoItems = JSON.parse(event.target.result);
          displayToDoItems('alphabetical'); // Display loaded items
        } catch (error) {
          console.error('Error loading to-do items:', error);
        }
      };
  
      reader.readAsText(file);
    });
  
    input.click();
  }

saveButton.addEventListener('click', saveToDoItems);
loadButton.addEventListener('click', loadToDoItems);

// Initial display (if any to-do items exist initially)
displayToDoItems();