/* eslint-disable no-undef */
async function getPhotographersFullData() {
  // fetch photographers data from json file
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const photographers = [];
  const photoMedia = [];

  // store photographer main data in a new array
  for (let i = 0; i < data.photographers.length; i++) {
    photographers.push(data.photographers[i]);
  }

  // store photographer media data in a new array
  for (let i = 0; i < data.media.length; i++) {
    photoMedia.push(data.media[i]);
  }

  return { photographers, photoMedia };
}

async function displayPhotographerHeaderData(photographer) {
  // create photographers header elements
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
  // create section for photographer portoflio
  const main = document.getElementById("main");
  const portfolioSection = document.createElement("section");
  portfolioSection.setAttribute("class", "portfolio");
  main.appendChild(portfolioSection);

  // gererate media card for each card
  media.forEach((pic) => {
    const portfolioModel = mediaFactory(pic);
    const portfolioCard = portfolioModel.getPortfolioCard();
    portfolioSection.appendChild(portfolioCard);
  });

  // manage likes, collect total likes...
  const heartElement = document.getElementsByClassName("heart");
  const likeNumberElement = document.getElementsByClassName("like-number");
  displayLike(media, heartElement, likeNumberElement);
}

async function init() {
  // collect photographers data
  const { photographers, photoMedia } = await getPhotographersFullData();

  // get photographer ID from the current page
  let params = new URLSearchParams(window.location.search);
  let photographerId = params.get("id");

  // create photographer Header
  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id == photographerId) {
      await displayPhotographerHeaderData(photographers[i]);
    }
  }
  // Retrieve media from the current photographer
  const photographerData = await photoMedia.filter(
    (media) => media.photographerId == photographerId
  );

  // diplay by default media by popularity
  const popularArraySorted = photographerData.sort((a, b) => b.likes - a.likes);
  displayMedia(popularArraySorted);
  lightboxDisplay(popularArraySorted);

  // get filter elements from DOM
  const dropdown = document.querySelector(".dropdown");
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");
  let newArrayFiltered = photographerData;

  // display the menu list from filter when clicked
  select.addEventListener("click", () => {
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
    select.setAttribute("aria-expanded", true);
    const sectionPortfolio = document.querySelector(".portfolio");
    const photographerHeader = document.querySelector(".photograph-header");
    // close filter menu when we leave filter section (if focus is on portfolio section)
    sectionPortfolio.addEventListener(
      "focus",
      () => {
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        select.setAttribute("aria-expanded", false);
      },
      true
    );
    // close filter menu when we leave filter section (if focus is on header section)
    photographerHeader.addEventListener(
      "focus",
      () => {
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        select.setAttribute("aria-expanded", false);
      },
      true
    );
  });

  // actions from the selected filter choose : on click
  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        option.removeAttribute("class");
      });
      option.classList.add("active");
      select.setAttribute("aria-expanded", false);
      select.focus();

      if (selected.innerText === "Popularité") {
        newArrayFiltered = photographerData.sort((a, b) => b.likes - a.likes);
        removePreviousSection();
        displayMedia(popularArraySorted);
        lightboxDisplay(popularArraySorted);
      } else if (selected.innerText === "Date") {
        newArrayFiltered = photographerData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        removePreviousSection();
        displayMedia(newArrayFiltered);
        lightboxDisplay(newArrayFiltered);
      } else if (selected.innerText === "Titre") {
        newArrayFiltered = photographerData.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        removePreviousSection();
        displayMedia(newArrayFiltered);
        lightboxDisplay(newArrayFiltered);
      }
    });
  });
  // actions from the selected filter choose : on Enter
  options.forEach((option) => {
    option.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        select.focus();
        selected.innerText = option.innerText;
        options.forEach((option) => {
          option.removeAttribute("class");
        });
        option.classList.add("active");
        select.setAttribute("aria-expanded", false);

        if (selected.innerText === "Popularité") {
          newArrayFiltered = photographerData.sort((a, b) => b.likes - a.likes);
          removePreviousSection();
          displayMedia(newArrayFiltered);
          lightboxDisplay(newArrayFiltered);
        } else if (selected.innerText === "Date") {
          newArrayFiltered = photographerData.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          removePreviousSection();
          displayMedia(newArrayFiltered);
          lightboxDisplay(newArrayFiltered);
        } else if (selected.innerText === "Titre") {
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

  // remove old portfolio section
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
