/* eslint-disable no-undef */
async function getPhotographers() {
  // Récupération des données des photographes
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const photographers = [];

  for (let i = 0; i < data.photographers.length; i++) {
    photographers.push(data.photographers[i]);
  }

  return { photographers };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    const link = document.getElementById(`photographer-id-${photographer.id}`);
    link.href += `?id=${photographer.id}`;
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
// photographerPage();
