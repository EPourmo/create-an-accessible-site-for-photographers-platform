/* eslint-disable no-unused-vars */

// function to manage like
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

  // get all heats element in an array
  for (let i = 0; i < hearts.length; i++) {
    imgHeartArray.push(hearts[i]);
  }

  // get all likes number in an array
  for (let i = 0; i < likeNumbers.length; i++) {
    likeNumberArray.push(likeNumbers[i]);
  }

  getTotalLikes();

  // Even listener on hearts
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

  // function to increment heart
  // if heart number = media.likes => increment
  //  else if number = media.likes + 1 => decrement
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

  // display total likes with changes
  function getTotalLikes() {
    let likeTotalArray = [];
    likeNumberArray.forEach((like) => {
      likeTotalArray.push(like.innerHTML);
    });

    // calculate total likes (first convert in number than reduce in 1 number)
    const totalLikes = likeTotalArray
      .map((item) => parseInt(item, 10))
      .reduce((previousValue, currentValue) => previousValue + currentValue);
    bottomLikeParagraph.textContent = totalLikes;
  }
}
