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

  const bottomlikeDiv = document.createElement("div.");
  const bottomLikeIcon = document.createElement("i");
  const bottomLikeParagraph = document.createElement("p");
  bottomlikeDiv.setAttribute("class", "likes-container");
  bottomLikeIcon.setAttribute("class", "fa-solid fa-heart");
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
    } else if (likeNumberArray[index].innerHTML == media[index].likes + 1) {
      likeNumberArray[index].innerHTML = media[index].likes;
      likeNumberArray[index].classList.remove("add-weight");
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
    console.log(totalLikes);
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
  const filteredData = await photoMedia.filter(
    (media) => media.photographerId == photographerId
  );

  // const exampletrie = filteredData.sort((a, b) => a.likes - b.likes);

  await displayMedia(filteredData);
  await lightboxDisplay(filteredData);
}

init();
