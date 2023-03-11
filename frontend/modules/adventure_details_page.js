import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
let url = new URLSearchParams(search);


  // Place holder for functionality to work in the Stubs
  return url.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
try{
    const detail = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const json = await detail.json()
    return json;
}

  // Place holder for functionality to work in the Stubs
  catch{
  return null;
}
}
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle
  adventure.images.map((image)=>{
    const container = document.createElement("div")
    const img = document.createElement("img")
    img.className = "activity-card-image"
    img.src = `${image}`
    container.append(img)
    document.getElementById("photo-gallery").append(container);
  })
  document.getElementById("adventure-content").innerHTML = adventure.content
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
const photo = document.getElementById("photo-gallery");
const slide = document.createElement("div")
slide.setAttribute("class", "carousel slide")
slide.id = "carouselExample";
const indicator = document.createElement("div")
indicator.class = "carousel-indicators"
const inner = document.createElement("div")
inner.class = "carousel-inner";

images.forEach((image, index)=>{
  const img = document.createElement("img");
  img.setAttribute("class","activity-card-image d-block w-100");
  img.src = `${image}`
  // if(image.active){
  //   img.classList.add("active")
  // }
  const item = document.createElement("div");
  const activeClass = index === 0 ? " active" : "";
  item.className =`carousel-item ${activeClass}`;
  // if(image.active){
  //   item.setAttribute("class","active");
  // }
  const btnIndicator = document.createElement("button");
  btnIndicator.setAttribute = ("type", "button")
  btnIndicator.setAttribute = ("data-bs-target","#carouselExampleIndicators")
  const imageIndex = index === 0 ? 'class = "active"' : "";
  btnIndicator.setAttribute = ("data-bs-slide-to", `${imageIndex}`)
  btnIndicator.setAttribute = ("aria-current", "true")
  btnIndicator.setAttribute = ("aria-lable", `slide ${imageIndex}`)
  indicator.append(btnIndicator);
  item.append(img);
  inner.append(item)
})
const prevbtn = document.createElement("button");
prevbtn.classList.add("carousel-control-prev");
prevbtn.setAttribute("type", "button")
prevbtn.setAttribute("data-bs-target","#carouselExample")
prevbtn.setAttribute("data-bs-slide","prev");
prevbtn.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>`;

const nxtbtn = document.createElement("button");
nxtbtn.classList.add("carousel-control-next");
nxtbtn.setAttribute("type", "button")
nxtbtn.setAttribute("data-bs-target","#carouselExample")
nxtbtn.setAttribute("data-bs-slide","next");
nxtbtn.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>`;

slide.append(prevbtn);
slide.append(nxtbtn);
slide.append(inner)
photo.append(slide)
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
