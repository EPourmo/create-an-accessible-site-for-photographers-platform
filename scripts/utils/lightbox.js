// create a ligthbox div
const lightbox = document.createElement("div");
lightbox.setAttribute("id", "lightbox");
document.body.appendChild(lightbox);

// select all media
function lightboxDisplay() {
  const mediaElement = document.querySelectorAll(".media-element");

  for (let i = 0; i < mediaElement.length; i++) {
    mediaElement[i].addEventListener("click", () => {
      lightbox.classList.add("active");
      console.log(mediaElement[i]);
      if (mediaElement[i].alt) {
        const newMedia = document.createElement("img");
        newMedia.setAttribute("src", mediaElement[i].src);
        lightbox.appendChild(newMedia);
      }
    });
  }
}
