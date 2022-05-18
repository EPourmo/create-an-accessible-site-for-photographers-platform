async function displayLike(media, hearts, likeNumbers) {
  let imgHeartArray = [];
  let likeNumberArray = [];
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

  for (let i = 0; i < hearts.length; i++) {
    imgHeartArray.push(hearts[i]);
  }
  for (let i = 0; i < likeNumbers.length; i++) {
    likeNumberArray.push(likeNumbers[i]);
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
      hearts[index].setAttribute("aria-pressed", true);
    } else if (likeNumberArray[index].innerHTML == media[index].likes + 1) {
      likeNumberArray[index].innerHTML = media[index].likes;
      likeNumberArray[index].classList.remove("add-weight");
      hearts[index].setAttribute("aria-pressed", false);
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
