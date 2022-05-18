async function getPhotographersFullData() {
  // Récupération des données des photographes
  const response = await fetch("/data/photographers.json");
  const data = await response.json();
  const photographers = [];
  const photoMedia = [];

  // récupération des données générales des photographes dans un tableau
  for (let i = 0; i < data.photographers.length; i++) {
    photographers.push(data.photographers[i]);
  }

  // récupération des données médias des photographes dans un tableau
  for (let i = 0; i < data.media.length; i++) {
    photoMedia.push(data.media[i]);
  }

  return { photographers, photoMedia };
}

async function displayPhotographerHeaderData(photographer) {
  // création des éléments Header de la page photographe
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const { information, img, contactBtn, bottomInfo } =
    await photographerModel.getUserHeaderDOM();
  const formName = document.querySelector("#photographer-name");

  photographerHeader.appendChild(information);
  photographerHeader.appendChild(contactBtn);
  photographerHeader.appendChild(img);
  photographerHeader.appendChild(bottomInfo);
  formName.textContent = photographer.name;

  // display modal
  document
    .getElementById("contact-btn-open")
    .addEventListener("click", () => displayModal());
}

async function displayMedia(media) {
  // création d'une section pour le portfolio
  const main = document.getElementById("main");
  const portfolioSection = document.createElement("section");
  portfolioSection.setAttribute("class", "portfolio");
  main.appendChild(portfolioSection);

  // on génère l'ensemble des card photo
  media.forEach((pic) => {
    const portfolioModel = mediaFactory(pic);
    const portfolioCard = portfolioModel.getPortfolioCard();
    portfolioSection.appendChild(portfolioCard);
  });

  // gestion des likes, récupération des likes et des hearts de la page
  const heartElement = document.getElementsByClassName("heart");
  const likeNumberElement = document.getElementsByClassName("like-number");
  displayLike(media, heartElement, likeNumberElement);
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
      await displayPhotographerHeaderData(photographers[i]);
    }
  }
  // Récupère les medias du photographe
  const photographerData = await photoMedia.filter(
    (media) => media.photographerId == photographerId
  );

  // affichage par défaut des données par order de popularité
  const popularArraySorted = photographerData.sort((a, b) => b.likes - a.likes);
  displayMedia(popularArraySorted);
  lightboxDisplay(popularArraySorted);

  // trie des données suivant le click / enter
  const dropdown = document.querySelector(".dropdown");
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");
  // const mainFocus = document.querySelectorAll(".main-focus");
  // const orderByParagraph = document.querySelector(".order-by");
  let newArrayFiltered = photographerData;

  // lorsque que le btn filtre est selectionné : affichage du menu des filtres
  select.addEventListener("click", () => {
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
    select.setAttribute("aria-expanded", true);
  });

  // définition des actions suivant le filtre choisi
  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        option.removeAttribute("class");
      });
      option.classList.add("active");
      select.setAttribute("aria-expanded", false);

      if (selected.textContent === "Popularité") {
        newArrayFiltered = photographerData.sort((a, b) => b.likes - a.likes);
        removePreviousSection();
        displayMedia(newArrayFiltered);
        lightboxDisplay(newArrayFiltered);
      } else if (selected.textContent === "Date") {
        newArrayFiltered = photographerData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        removePreviousSection();
        displayMedia(newArrayFiltered);
        lightboxDisplay(newArrayFiltered);
      } else if (selected.textContent === "Titre") {
        newArrayFiltered = photographerData.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        removePreviousSection();
        displayMedia(newArrayFiltered);
        lightboxDisplay(newArrayFiltered);
      } else {
        newArrayFiltered = photographerData;
        removePreviousSection();
        displayMedia(newArrayFiltered);
        lightboxDisplay(newArrayFiltered);
      }
    });
  });

  options.forEach((option) => {
    option.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        selected.textContent = option.textContent;
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        options.forEach((option) => {
          option.removeAttribute("class");
        });
        option.classList.add("active");
        select.setAttribute("aria-expanded", false);

        if (selected.textContent === "Popularité") {
          newArrayFiltered = photographerData.sort((a, b) => b.likes - a.likes);
          removePreviousSection();
          displayMedia(newArrayFiltered);
          lightboxDisplay(newArrayFiltered);
        } else if (selected.textContent === "Date") {
          newArrayFiltered = photographerData.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          removePreviousSection();
          displayMedia(newArrayFiltered);
          lightboxDisplay(newArrayFiltered);
        } else if (selected.textContent === "Titre") {
          newArrayFiltered = photographerData.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          removePreviousSection();
          displayMedia(newArrayFiltered);
          lightboxDisplay(newArrayFiltered);
        } else {
          newArrayFiltered = photographerData;
          removePreviousSection();
          displayMedia(newArrayFiltered);
          lightboxDisplay(newArrayFiltered);
        }
      }
    });
  });

  // suppression de l'ancienne section du portfolio
  function removePreviousSection() {
    const main = document.getElementById("main");
    const portfolioSection = document.querySelector(".portfolio");
    main.removeChild(portfolioSection);
    const bottomInfo = document.querySelector(".bottom-info");
    const totalLikesContainer = document.querySelector(".likes-container");
    bottomInfo.removeChild(totalLikesContainer);
  }
}

init();
