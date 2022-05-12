function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const localisation = document.createElement("p");
    const description = document.createElement("p");
    const dailyRate = document.createElement("p");

    img.setAttribute("src", picture);
    img.setAttribute("alt", " ");

    link.setAttribute("href", "/photographer.html");
    link.setAttribute("id", `photographer-id-${id}`);
    link.setAttribute("aria-labelledby", `photographer-name-${id}`);

    h2.setAttribute("id", `photographer-name-${id}`);
    h2.textContent = name;

    localisation.textContent = `${city}, ${country}`;
    localisation.setAttribute("class", "localisation");

    description.textContent = tagline;
    description.setAttribute("class", "description");

    dailyRate.textContent = `${price}€/jour`;
    dailyRate.setAttribute("class", "daily-rate");

    link.appendChild(img);
    link.appendChild(h2);

    article.appendChild(link);
    article.appendChild(localisation);
    article.appendChild(description);
    article.appendChild(dailyRate);
    return article;
  }

  function getUserHeaderDOM() {
    const information = document.createElement("div");
    const bottomInfo = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const localisation = document.createElement("p");
    const description = document.createElement("p");
    const dailyRate = document.createElement("p");

    information.setAttribute("class", "photographer-header-info");
    bottomInfo.setAttribute("class", "bottom-info");

    img.setAttribute("src", picture);
    img.setAttribute("alt", " ");

    h2.setAttribute("id", `photographer-name-${id}`);
    h2.textContent = name;

    localisation.textContent = `${city}, ${country}`;
    localisation.setAttribute("class", "localisation");

    description.textContent = tagline;
    description.setAttribute("class", "description");

    dailyRate.textContent = `${price}€/jour`;
    dailyRate.setAttribute("class", "daily-rate");

    information.appendChild(h2);
    information.appendChild(localisation);
    information.appendChild(description);
    bottomInfo.appendChild(dailyRate);
    return { information, img, bottomInfo };
  }

  return { name, picture, getUserCardDOM, id, getUserHeaderDOM };
}

function mediaFactory(data) {
  const { id, photographerId, title, image, likes, date, price, video } = data;

  const photoMedia = `/assets/images/${image}`;
  const videoMedia = `assets/videos/${video}`;

  function getPortfolioCard() {
    const card = document.createElement("div");
    const cardInfo = document.createElement("div");
    const cardInfoLike = document.createElement("div");

    if (video) {
      const cardVideo = document.createElement("div");
      cardVideo.setAttribute("class", "card-media");
      const vid = document.createElement("video");
      vid.setAttribute("controls", "");

      const source = document.createElement("source");
      source.setAttribute("src", videoMedia);
      source.setAttribute("type", "video/mp4");
      source.setAttribute("class", "photo-element media-element");
      vid.appendChild(source);
      cardVideo.appendChild(vid);
      card.appendChild(cardVideo);
    } else {
      const cardImg = document.createElement("div");
      cardImg.setAttribute("class", "card-media test");
      const imgLink = document.createElement("a");
      const img = document.createElement("img");
      imgLink.setAttribute("href", "#");
      img.setAttribute("src", photoMedia);
      img.setAttribute("alt", `${title}, closeup view`);
      img.setAttribute("class", "photo-element media-element");
      imgLink.appendChild(img);
      cardImg.appendChild(imgLink);
      card.appendChild(cardImg);
    }

    const titleCard = document.createElement("p");
    const likeNumb = document.createElement("p");
    const likeIcon = document.createElement("i");

    card.setAttribute("class", "card");
    cardInfo.setAttribute("class", "card-info");
    titleCard.setAttribute("class", "card-title");
    titleCard.textContent = title;
    cardInfoLike.setAttribute("class", "card-like");
    likeNumb.textContent = likes;
    likeIcon.setAttribute("class", "fa-solid fa-heart");
    likeIcon.setAttribute("aria-label", "likes");

    cardInfoLike.appendChild(likeNumb);
    cardInfoLike.appendChild(likeIcon);

    cardInfo.appendChild(titleCard);
    cardInfo.appendChild(cardInfoLike);

    card.appendChild(cardInfo);
    return card;
  }

  return { id, getPortfolioCard };
}
