async function getPhotographersFullData() {
  // Récupération des données des photographes
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  const photographers = [];
  const photoMedia = [];

  for (let i = 0; i < data.photographers.length; i++) {
    photographers.push(data.photographers[i]);
  }

  for (let i = 0; i < data.media.length; i++) {
    photoMedia.push(data.media[i]);
  }

  return { photographers, photoMedia };
}

async function displayPhotographerHeaderData(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const { information, img, bottomInfo } =
    await photographerModel.getUserHeaderDOM();
  const formName = document.querySelector("#photographer-name");

  photographerHeader.appendChild(information);
  photographerHeader.appendChild(img);
  photographerHeader.appendChild(bottomInfo);
  formName.textContent = photographer.name;
}

async function displayMedia(media) {
  const main = document.getElementById("main");
  const portfolioSection = document.createElement("section");
  portfolioSection.setAttribute("class", "portfolio");
  main.appendChild(portfolioSection);

  media.forEach((pic) => {
    const portfolioModel = mediaFactory(pic);
    const portfolioCard = portfolioModel.getPortfolioCard();
    portfolioSection.appendChild(portfolioCard);
  });

  lightboxDisplay();
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, photoMedia } = await getPhotographersFullData();

  // Récupère l'ID du photographe suivant la page
  let params = new URLSearchParams(window.location.search);
  let photographerId = params.get("id");

  // Récupère les informations du header du photographe
  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id == photographerId) {
      displayPhotographerHeaderData(photographers[i]);
    }
  }
  // Récupère les medias du photographe
  const filteredData = photoMedia.filter(
    (media) => media.photographerId == photographerId
  );

  // change l'action lors de l'envoi du formulaire
  // const formPhotographer = document.getElementById("form");
  // formPhotographer.setAttribute(
  //   "action",
  //   `photographer.html?id=${photographerId}`
  // );

  displayMedia(filteredData);
}

init();
