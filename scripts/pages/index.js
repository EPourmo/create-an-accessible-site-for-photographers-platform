/* eslint-disable no-undef */
async function getPhotographers() {
  // fetch photographers data from json file
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const photographers = [];
  // store data in a new array
  for (let i = 0; i < data.photographers.length; i++) {
    photographers.push(data.photographers[i]);
  }

  return { photographers };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  // create photographer card on main page
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    const link = document.getElementById(`photographer-id-${photographer.id}`);
    link.href += `?id=${photographer.id}`;
  });
}

async function init() {
  // get photographers data
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
// photographerPage();
