// Search Box toggle
const searchCheckbox = document.getElementById("search-check");
const searchInputContainer = document.getElementById("search-input");
const searchIcon = document.querySelector("#search-btn i");

searchIcon.addEventListener("click", () => {
searchCheckbox.checked = !searchCheckbox.checked;

  if (searchCheckbox.checked) {
    searchInputContainer.classList.add("visible");
  } else {
    searchInputContainer.classList.remove("visible");
  }
});
// Copy for menu button small media 
const menuCheck = document.querySelector("#menu-btn input");
const menuIcon = document.querySelector("#menu-btn i");

menuIcon.addEventListener("click", () => {
  menuCheck.checked = !menuCheck.checked;

  if (menuCheck.checked) {
    searchInputContainer.classList.add("visible"); 
  } else {
    searchInputContainer.classList.remove("visible");
  }
});
// END OF SEARCH BOX TOGGLE

// Summary link deactivation 
document.querySelectorAll('summary a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
  });
});
// END OF SUMMARY LINK DISABLE

// To-Do Page 
const toDoLink = document.getElementById("to-do-link");
const sideList = document.querySelector(".side-list");
const sideSeperator = document.getElementById("side-seperator");
const mainHomeContent = document.querySelector(".main-home-content");

toDoLink.addEventListener("click", (hideMain));
// END OF TO-DO PAGE

// Functions
function hideMain () {
  sideList.classList.add("not-visable")
  sideSeperator.classList.add("not-visable")
  mainHomeContent.classList.add("not-visable")
}
// END OF FUNCTIONS
// END OF MAIN


// TODO
const toDoForm = document.getElementById("to-do-form");
const toDoInput = document.getElementById("to-do-input");
const toDoList = document.getElementById("to-do-list");

const now = new Date();
const shortDate = now.toLocaleDateString('en-GB');
const shortTime = now.toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
});
const formatted = `${shortDate} ${shortTime}`;

// Initialise array - Get all if saved. Update list
let allToDos = getAllToDo();
updateToDoList();

toDoForm.addEventListener("submit", function(e){
  e.preventDefault();
  addToDo();
})

// Adding new text to list - Validate and clear input
function addToDo () {
  const now = new Date();
  const shortDate = now.toLocaleDateString('en-GB');
  const shortTime = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formatted = `${shortDate} ${shortTime}`;
  const toDoText = toDoInput.value.trim();
  // console.log(toDoText + " |" + formatted)
  if(toDoText.length > 0 ){
    const toDoTextAll = (toDoText + "<span>" + formatted + "</span>")
    const toDoObj = {
      text: toDoTextAll,
      completed: false
    }
    allToDos.push(toDoObj);
    updateToDoList();
    saveToDo();
    toDoInput.value = "";
    // console.log(allToDos)
}
}

// Update on screen list 
function updateToDoList (){
  toDoList.innerHTML = "";
  allToDos.forEach((toDo, toDoIndex) => {
    toDoItem = createToDoItem(toDo, toDoIndex);
    toDoList.append(toDoItem);
  });
}

// Create HTML li
function createToDoItem(toDo, toDoIndex) {
  const toDoID = "todo-"+toDoIndex;
  const toDoLi = document.createElement("li");
  const toDoText = toDo.text;
  toDoLi.className = "to-do";
  toDoLi.innerHTML = `
  <input type="checkbox" id="${toDoID}">
      <label class="custom-checkbox" for="${toDoID}">
      <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
      </label>
  <label for="${toDoID}" class="to-do-text">
  ${toDoText}
  </label>
  <button class="to-do-delete-btn">
      <svg fill="var(--white-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
  </button>
  `
  const deleteBtn = toDoLi.querySelector(".to-do-delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteToDoItem(toDoIndex);
  })
  const toDoCheckbox = toDoLi.querySelector("input");
  toDoCheckbox.addEventListener("change", () =>  {
    allToDos[toDoIndex].completed = toDoCheckbox.checked;
    saveToDo();
  })
  toDoCheckbox.checked = toDo.completed;
  return toDoLi
}

// Remove from 
function deleteToDoItem (toDoIndex) {
  allToDos = allToDos.filter((_, i) => i !== toDoIndex);
  saveToDo()
  updateToDoList()
}

// Save to local Storage
function saveToDo () {
  const toDosJson = JSON.stringify(allToDos);
  localStorage.setItem("savedList", toDosJson);
}

// Get from local storage
function getAllToDo () {
  const allSavedToDo = localStorage.getItem("savedList") || "[]";
  return JSON.parse(allSavedToDo)
}
// END OF TO DO 