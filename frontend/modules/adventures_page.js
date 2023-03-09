
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {   
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
const url = new URLSearchParams(search);
const cityName = url.get("city");
return cityName;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
try{
  const responce = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
  const json = await responce.json();
  return json;
}
catch(error){
  return null;
}
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((element)=>{
  const data = document.getElementById("data");
  const ele = document.createElement("div")
  // ele.setAttribute("class", "col-6 col-lg-3, mb-4");

  // let link = document.createElement("a")
  // link.href = `"detail/?adventure=${element.id}" id="${element.id}"`
  // let card = document.createElement("div")
  // card.setAttribute("class", "card activity-card");
  // let image = document.createElement("img")
  // image.src = `${element.image}`
  // card.append(image)
  // let category = document.createElement("div")
  // category.setAttribute("class", "category-banner float-right")
  // category.append(element.category)
  // card.append(category)
  // let body = document.createElement("div")
  // body.setAttribute("class", "card-body")
  // let card1 = document.createElement("div")
  // card1.setAttribute("class", "d-md-flex justify-content-between text-center")
  // let text = document.createElement("h5")
  // text.setAttribute("class", "card-title")
  // text.append(element.name)
  // let cost = document.createElement("p")
  // cost.setAttribute("class", "card-text")
  // cost.append(element.costPerHead)
  // card1.append(text);
  // card1.append(cost);
  // body.append(card1);
  // let card2 = document.createElement("div");
  // card2.setAttribute("class", "d-md-flex justify-content-between text-center");
  // let duration = document.createElement("h5");
  // duration.setAttribute("class", "card-title");
  // duration.innerText = "Duration";
  // let hours = document.createElement("p");
  // hours.setAttribute("class", "card-text");
  // hours.append(element.duration)
  // card2.append(duration);
  // card2.append(hours);
  // body.append(card2);
  // card.append(body);
  // link.append(card);
  // ele.append(link);
  ele.innerHTML =
  `<a href="detail/?adventure=${element.id}" id="${element.id}">
   <div class="card activity-card">
   <img src="${element.image}" class="img-responsive"/>
   <div class="category-banner float-right">${element.category}</div>
   <div class="card-body">
   <div class="d-md-flex justify-content-between text-center">
   <h5 class="card-title">${element.name}</h5>
   <p class=card-text>${element.costPerHead}</p>
   </div>
   <div class="d-md-flex justify-content-between text-center">
   <h5 class="card-title">Duration</h5>
   <p class=card-text>${element.duration}Hours</p>
   </div>
   </div>
   </div>
   </a>
  ` 
  data.append(ele);
  })

}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
let duration = list.filter(e=>{
  return (low === null || e.duration >= low)&&(high === null || e.duration <= high);
})
return duration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
let category = list.filter((e)=> categoryList.includes(e.category));
return category;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
let filteredList = [];
  if(filters["duration"].length > 0 && filters["category"].length > 0){
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

else if(filters["duration"].length > 0){
  let choice = filters["duration"].split("-");
  filteredList = filterByDuration(
    list,
    parseInt(choice[0]),
    parseInt(choice[1])
  );
}
else if(filters["category"].length > 0){
  filteredList = filterByCategory(list, filters["category"]);
}
else{
  filteredList = list;
}
return filteredList;
}


//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
const savedFilters = localStorage.getItem("filters")
if (savedFilters){
  return JSON.parse(savedFilters);
}

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // const durationFilter = (filters => filters.type === 'duration');
  // if(durationFilter){
  //   const durationInput = document.getElementById("duration-select")
  //   durationInput.value = durationFilter.value

    const categoryPills = filters.category.map(filter => {
      return `<div class="category-pill">${filter.value}</div>`;
    })
    const categoryPillsContainer = document.getElementById("category-list")
    categoryPillsContainer.innerHTML = categoryPills;
  }
 

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
