// import { response } from "express";
import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities()
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try{ const responce = await fetch("http://43.204.104.34:8082/cities");
   const json = responce.json();
  return json;
}
catch(error){
  return null;
}
}
// fetchCities();
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
let container = document.createElement("div");
container.setAttribute("class", "col-12", "tile-text", "text-center");
container.setAttribute("id", id);
let innerHTML = `<img src="${image}" class="img-responsive"><p>${city}</p><p>${description}</p>`;
container.innerHTML = innerHTML;
document.getElementById("data").append(container);
}

export { init, fetchCities, addCityToDOM };


// File: frontend/conf/index.js
// const config = { backendEndpoint: "http://13.126.116.51:8082" };

// export default config;
