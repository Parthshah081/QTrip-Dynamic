import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try{ const responce = await fetch(config.backendEndpoint + "/cities");
   const json = await responce.json();
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
container.setAttribute("class", "col-6 col-lg-3 mb-4");
let innerHTML = ` <a href="/pages/adventures/?city=${id}" id="${id}">
<div class="tile">
  <div class="tile-text text-center">
    <h5>${city}</h5>
    <p>${description}</p>
    </div>
    <img class="img-responsive" src="${image}" alt=""/>
</div>
</a>`
container.innerHTML = innerHTML;
document.getElementById("data").append(container);
}

export { init, fetchCities, addCityToDOM };


// const config = { backendEndpoint: "http://43.205.10.9:8082" };

// export default config;
