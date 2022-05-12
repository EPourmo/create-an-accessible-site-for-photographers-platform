// create a ligthbox div
const lightbox = document.createElement("div");
lightbox.setAttribute("id", "lightbox");
document.body.appendChild(lightbox);
const lightboxContainer = document.createElement("div");
lightboxContainer.setAttribute("class", "lightbox-container");
lightbox.appendChild(lightboxContainer);

// create close btn and arrows
const closeBtnLb = document.createElement("img");
closeBtnLb.setAttribute("src", "assets/icons/close.svg");
closeBtnLb.setAttribute("class", "close-btn-lb");
const rightArrow = document.createElement("i");
const leftArrow = document.createElement("i");
rightArrow.setAttribute("class", "fa-solid fa-angle-right right-arrow");
leftArrow.setAttribute("class", "fa-solid fa-angle-left left-arrow");

lightboxContainer.appendChild(closeBtnLb);
lightboxContainer.appendChild(rightArrow);
lightboxContainer.appendChild(leftArrow);

// close lightbox
closeBtnLb.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

closeBtnLb.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    lightbox.classList.remove("active");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    lightbox.classList.remove("active");
  }
});

// select all media
function lightboxDisplay() {
  const mediaElement = document.querySelectorAll(".photo-element");
  const newMedia = document.createElement("img");
  let mediaArray = [];
  let currentIndex;

  // create an array of ordered img element
  for (let i = 0; i < mediaElement.length; i++) {
    mediaArray.push(mediaElement[i]);
  }

  mediaArray.forEach((media, index) => {
    media.addEventListener("click", () => showLightbox(media, index));
  });

  mediaArray.forEach((media, index) => {
    media.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        showLightbox(media, index);
      }
    });
  });

  // document.addEventListener("keydown", function (event) {
  //   if (event.key === "Escape") {
  //     lightbox.classList.remove("active");
  //   }
  // });

  // use arrow for caroussel
  rightArrow.addEventListener("click", nextPhoto);
  leftArrow.addEventListener("click", previousPhoto);

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      nextPhoto();
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      previousPhoto();
    }
  });

  function showLightbox(media, index) {
    lightbox.classList.add("active");
    newMedia.setAttribute("src", media.src);
    newMedia.setAttribute("class", "img-lb");
    lightboxContainer.appendChild(newMedia);
    currentIndex = index;
  }

  function nextPhoto() {
    if (currentIndex == mediaArray.length - 1) {
      newMedia.setAttribute("src", mediaArray[0].src);
      currentIndex = 0;
    } else {
      newMedia.setAttribute("src", mediaArray[currentIndex + 1].src);
      currentIndex++;
    }
  }

  function previousPhoto() {
    if (currentIndex == 0) {
      newMedia.setAttribute("src", mediaArray[mediaArray.length - 1].src);
      currentIndex = mediaArray.length - 1;
    } else {
      newMedia.setAttribute("src", mediaArray[currentIndex - 1].src);
      currentIndex--;
    }
  }
}
