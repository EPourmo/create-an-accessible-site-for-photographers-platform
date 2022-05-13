// --------- START create elements--------
// create a ligthbox div
const lightbox = document.createElement("div");
lightbox.setAttribute("id", "lightbox");
lightbox.setAttribute("aria-hidden", true);
document.body.appendChild(lightbox);
// create a ligthbox container
const lightboxContainer = document.createElement("div");
lightboxContainer.setAttribute("class", "lightbox-container");
lightbox.appendChild(lightboxContainer);
// create image and paragraph
const newMedia = document.createElement("img");
lightboxContainer.appendChild(newMedia);
const lightboxTitle = document.createElement("p");
lightboxContainer.appendChild(lightboxTitle);
// create  arrows
const rightArrow = document.createElement("i");
const leftArrow = document.createElement("i");
rightArrow.setAttribute(
  "class",
  "fa-solid fa-angle-right right-arrow lb-focus"
);
leftArrow.setAttribute("class", "fa-solid fa-angle-left left-arrow lb-focus");
lightboxContainer.appendChild(leftArrow);
lightboxContainer.appendChild(rightArrow);
// create close btn
const closeBtnLb = document.createElement("img");
closeBtnLb.setAttribute("src", "assets/icons/close.svg");
closeBtnLb.setAttribute("class", "close-btn-lb");
closeBtnLb.setAttribute("class", "close-btn-lb lb-focus");
lightboxContainer.appendChild(closeBtnLb);

// --------- END create elements--------
// -------------------------------------------

// ----------- START Main function----------
async function lightboxDisplay(data) {
  let currentIndex;
  let title;
  let mediaArray = [];
  const mediaElement = document.querySelectorAll(".photo-element");

  const mediaOnlyImg = data.filter((media) => media.image);

  // create an array of ordered img element
  for (let i = 0; i < mediaElement.length; i++) {
    mediaArray.push(mediaElement[i]);
  }
  // create a click event listener on img element
  mediaArray.forEach((media, index) => {
    media.addEventListener("click", () => showLightbox(media, index));
  });
  // create an Enter event listener on img element
  mediaArray.forEach((media, index) => {
    media.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        showLightbox(media, index);
      }
    });
  });

  // close lightbox with click event
  closeBtnLb.addEventListener("click", () => {
    removeLightbox();
  });
  // close lightbox with enter event
  closeBtnLb.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      removeLightbox();
    }
  });
  // close lightbox with escape event
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      removeLightbox();
    }
  });

  // function to show lightbox img (img added and title)
  function showLightbox(media, index) {
    lightbox.classList.add("active");
    newMedia.setAttribute("src", media.src);
    newMedia.setAttribute("class", "img-lb lb-focus");
    currentIndex = index;
    title = mediaOnlyImg[currentIndex].title;
    lightboxTitle.textContent = title;
    lightboxTitle.setAttribute("class", "lb-focus");
    // change focus
    const main = document.getElementById("main");
    main.setAttribute("aria-hidden", true);
    lightbox.setAttribute("aria-hidden", false);

    const mainFocus = document.querySelectorAll(".main-focus");
    const lbFocus = document.querySelectorAll(".lb-focus");
    lbFocus.forEach((element) => {
      element.setAttribute("tabindex", 0);
    });

    mainFocus.forEach((element) => {
      element.setAttribute("tabindex", -1);
    });
  }

  function removeLightbox() {
    lightbox.classList.remove("active");
    // change focus
    const main = document.getElementById("main");
    main.setAttribute("aria-hidden", false);
    lightbox.setAttribute("aria-hidden", true);

    const mainFocus = document.querySelectorAll(".main-focus");
    const lastMainFocus = document.querySelectorAll(".last-focus");
    const lbFocus = document.querySelectorAll(".lb-focus");
    lbFocus.forEach((element) => {
      element.setAttribute("tabindex", -1);
    });

    mainFocus.forEach((element) => {
      element.setAttribute("tabindex", 1);
    });

    // lastMainFocus.forEach((element) => {
    //   element.setAttribute("tabindex", 2);
    // });
  }

  // use arrow for caroussel : click event
  rightArrow.addEventListener("click", nextPhoto);
  leftArrow.addEventListener("click", previousPhoto);
  // use arrow for caroussel : arrows keyboard event
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
  // caroussel functions
  function nextPhoto() {
    if (currentIndex == mediaArray.length - 1) {
      newMedia.setAttribute("src", mediaArray[0].src);
      currentIndex = 0;
      title = mediaOnlyImg[currentIndex].title;
      lightboxTitle.textContent = title;
    } else {
      newMedia.setAttribute("src", mediaArray[currentIndex + 1].src);
      currentIndex++;
      title = data[currentIndex].title;
      lightboxTitle.textContent = title;
    }
  }

  function previousPhoto() {
    if (currentIndex == 0) {
      newMedia.setAttribute("src", mediaArray[mediaArray.length - 1].src);
      currentIndex = mediaArray.length - 1;
      title = data[currentIndex].title;
      lightboxTitle.textContent = title;
    } else {
      newMedia.setAttribute("src", mediaArray[currentIndex - 1].src);
      currentIndex--;
      title = data[currentIndex].title;
      lightboxTitle.textContent = title;
    }
  }
}
