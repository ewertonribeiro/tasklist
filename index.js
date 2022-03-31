//Define Vars
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list")
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.getElementById("filter");
const taskInput = document.getElementById("task");
///


//Load All Event Listeners
function LoadEvents() {


  //DOM Onload Event
  document.addEventListener("DOMContentLoaded", loadTasks)
  //Submit Event
  form.addEventListener("submit", addTasks);
  //Remove Task Event
  taskList.addEventListener("click", removeTasks);
  //Remove All Tasks Event
  clearBtn.addEventListener("click", clearTasks);
  //Filter Tasks
  filter.addEventListener("keyup", filterTasks);

}


//Load All tasks in The Begining
function loadTasks() {
  let tasks = isLocalStorageEmpty();

  tasks.forEach(task => {
    renderTask(task)
  })

}

//Render all the Tasks or create a new one
function renderTask(value) {


  //Create The Element
  const li = document.createElement("li");
  li.className = "collection-item";
  //Add The Input value
  li.appendChild(document.createTextNode(value));
  //Delete Button
  const link = document.createElement("a");
  link.className = "delete-item secondary-content"
  link.innerHTML = '<i class="material-icons small" style="cursor:pointer;">clear</i>'
  li.appendChild(link);
  //Add to The UI
  taskList.appendChild(li);
}


//Add Tasks 
function addTasks(e) {

  e.preventDefault();

  if (!taskInput.value) {
    alert("Please Enter a Value")

    return;
  }

  //Create A new Task asn Add to The DOM
  renderTask(taskInput.value);

  //Add To localStorage
  const tasks = isLocalStorageEmpty();
  addToLocalStorage(tasks, taskInput.value);

  //Clear The Input
  taskInput.value = '';
}


function addToLocalStorage(tasks, task) {

  const ls = localStorage;

  tasks.push(task);

  ls.setItem("tasks", JSON.stringify(tasks));

}

function isLocalStorageEmpty() {

  const ls = localStorage;

  let tasks;

  const items = ls.getItem("tasks");

  if (!items) {

    tasks = [];
  } else {
    tasks = JSON.parse(items)
  }


  return tasks;
}

function removeTasks(e) {

  // const ls = localStorage;

  const element = e.target.parentElement.parentElement

  if (e.target.parentElement.classList.contains("delete-item")) {

    if (confirm("Are You sure?")) {

      element.remove();

      const tasks = isLocalStorageEmpty();

      tasks.forEach((task, index) => {
        if (element.textContent === `${task}clear`) {
          //Remove
          tasks.splice(index, 1);
        }

        localStorage.setItem("tasks", JSON.stringify(tasks))
      });


    }
  }




}

function clearTasks() {
  if (confirm("You want to delete all Tasks?")) {
    taskList.innerHTML = '';

    localStorage.clear();
  }


}


function filterTasks(e) {

  const text = e.target.value.toLowerCase();




  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block"
    } else {
      task.style.display = "none";
    }


  })

}

LoadEvents();
