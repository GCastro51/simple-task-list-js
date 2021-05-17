// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// function for event listeners
function loadEventListeners() {

  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit', addTask);

  // delete task event
  document.body.addEventListener('click', deleteItem);
  
  //clear tasks event
  clearBtn.addEventListener('click', clearTasks);

  // filter tasks event
  filter.addEventListener('keyup', filterTasks);


}

// Get Tasks from Local Storage
function getTasks () {
  let tasks;

  //determine if tasks empty in local storage
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create text node and append to li 
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // add a class 
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to the li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  })
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // create text node and append to li 
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  // add a class 
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to the li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';

    console.log(li);

  e.preventDefault();
}

function deleteItem(e) {

  //will look in classlist node for specified class (if classes added)
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure you want to delete this task?')){
      e.target.parentElement.parentElement.remove();

      // Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  //determine if tasks empty in local storage
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  //my solution
  // let items = document.querySelectorAll('ul.collection li.collection-item');
  // items.forEach(function(li, index){
  //   li.remove();
  // });

  //his solution - Fast
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();

}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  //my solution
  // console.log(e.target.value);

  // let items = document.querySelectorAll('ul.collection li.collection-item');
  // items.forEach(function(li, index){
  //   if(e.target.value === null || e.target.value == ''){
  //     li.style.display = 'block';
  //   } else {
  //     if(!li.innerHTML.includes(e.target.value)) {
  //       li.style.display = 'none';
  //     } else {
  //       li.style.display = 'block';
  //     }
  //   }
  // });

  //his solution
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    // will return -1 if not found!
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function storeTaskInLocalStorage(task) {
  let tasks;

  //determine if tasks empty in local storage
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  //push new task in array
  tasks.push(task);

  //set new task array that is json stringify
  localStorage.setItem('tasks', JSON.stringify(tasks));
}