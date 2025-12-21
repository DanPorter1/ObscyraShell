// Search Box toggle
const searchCheckbox = document.getElementById("search-check");
const searchInputContainer = document.getElementById("search-input");
const searchIcon = document.querySelector("#search-btn i");

// searchIcon.addEventListener("click", () => {
// searchCheckbox.checked = !searchCheckbox.checked;

//   if (searchCheckbox.checked) {
//     searchInputContainer.classList.add("visible");
//   } else {
//     
//   }
// });

// REWORK SEARCH BOX -- ISSUES WITH TO-DO LINK 
searchIcon.addEventListener("click", () => {
searchCheckbox.checked = !searchCheckbox.checked;

  if (searchCheckbox.checked) {
    searchInputContainer.innerHTML = `<input type="text" placeholder="Search..."> `
    searchInputContainer.classList.add("visible");
    console.log("searchbar created");
  }
  else {
    searchInputContainer.innerHTML = ""
    searchInputContainer.classList.remove("visible");
    console.log("Removed Search");
  }
});

// Copy for menu button small media 
const menuCheck = document.querySelector("#menu-btn input");
const menuIcon = document.querySelector("#menu-btn i");

menuIcon.addEventListener("click", () => {
  menuCheck.checked = !menuCheck.checked;

  if (menuCheck.checked) {
    searchInputContainer.innerHTML = `<input type="text" placeholder="Search..."> `
    searchInputContainer.classList.add("visible"); 
  } else {
    searchInputContainer.classList.remove("visible");
    setTimeout(() => { searchInputContainer.innerHTML = ""; }, 320);
  }
});
// END OF SEARCH BOX TOGGLE