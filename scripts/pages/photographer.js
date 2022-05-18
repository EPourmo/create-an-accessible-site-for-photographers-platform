async function getPhotographersFullData() {
  // Récupération des données des photographes
  const response = await fetch("/data/photographers.json");
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

  // gestion des likes
  let imgHeartArray = [];
  let likeNumberArray = [];
  const heartElement = document.getElementsByClassName("heart");
  const likeNumberElement = document.getElementsByClassName("like-number");

  const bottomlikeDiv = document.createElement("div");
  const bottomLikeIcon = document.createElement("i");
  const bottomLikeParagraph = document.createElement("p");
  bottomlikeDiv.setAttribute("class", "likes-container");
  bottomLikeIcon.setAttribute("class", "fa-solid fa-heart");
  bottomLikeIcon.setAttribute("aria-label", "likes");
  bottomLikeParagraph.setAttribute("class", "total-likes");
  bottomlikeDiv.appendChild(bottomLikeParagraph);
  bottomlikeDiv.appendChild(bottomLikeIcon);
  document.querySelector(".bottom-info").appendChild(bottomlikeDiv);

  for (let i = 0; i < heartElement.length; i++) {
    imgHeartArray.push(heartElement[i]);
  }
  for (let i = 0; i < likeNumberElement.length; i++) {
    likeNumberArray.push(likeNumberElement[i]);
  }

  getTotalLikes();

  imgHeartArray.forEach((heart, index) => {
    heart.addEventListener("click", () => {
      addLike(index);
      getTotalLikes();
    });
  });
  imgHeartArray.forEach((heart, index) => {
    heart.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        addLike(index);
        getTotalLikes();
      }
    });
  });

  function addLike(index) {
    if (likeNumberArray[index].innerHTML == media[index].likes) {
      likeNumberArray[index].innerHTML = media[index].likes + 1;
      likeNumberArray[index].classList.add("add-weight");
      heartElement[index].setAttribute("aria-pressed", true);
    } else if (likeNumberArray[index].innerHTML == media[index].likes + 1) {
      likeNumberArray[index].innerHTML = media[index].likes;
      likeNumberArray[index].classList.remove("add-weight");
      heartElement[index].setAttribute("aria-pressed", false);
    }
  }

  // affichage global des likes
  function getTotalLikes() {
    let likeTotalArray = [];
    likeNumberArray.forEach((like) => {
      likeTotalArray.push(like.innerHTML);
    });

    const totalLikes = likeTotalArray
      .map((item) => parseInt(item, 10))
      .reduce((previousValue, currentValue) => previousValue + currentValue);
    bottomLikeParagraph.textContent = totalLikes;
  }
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
  const orderByParagraph = document.querySelector(".order-by");
  let newArrayFiltered = photographerData;

  select.addEventListener("click", () => {
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
    select.setAttribute("aria-expanded", true);
  });

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

      orderByParagraph.setAttribute("tabindex", 0);
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
