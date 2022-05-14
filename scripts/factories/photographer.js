function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const paragraphContainer = document.createElement("div");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const localisation = document.createElement("p");
    const description = document.createElement("p");
    const dailyRate = document.createElement("p");

    paragraphContainer.setAttribute("class", "paragraph-container");
    paragraphContainer.setAttribute("tabindex", 0);
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

    paragraphContainer.appendChild(localisation);
    paragraphContainer.appendChild(description);
    paragraphContainer.appendChild(dailyRate);

    article.appendChild(link);
    article.appendChild(paragraphContainer);
    return article;
  }

  function getUserHeaderDOM() {
    const information = document.createElement("div");
    const bottomInfo = document.createElement("div");
    const contactBtn = document.createElement("button");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const paragraphContainerPhotographer = document.createElement("div");
    const localisation = document.createElement("p");
    const description = document.createElement("p");
    const dailyRate = document.createElement("p");

    information.setAttribute("class", "photographer-header-info");
    bottomInfo.setAttribute("class", "bottom-info main-focus");
    bottomInfo.setAttribute("tabindex", 1);
    paragraphContainerPhotographer.setAttribute(
      "class",
      "photographer-paragraph-info main-focus"
    );

    paragraphContainerPhotographer.setAttribute("tabindex", 1);

    contactBtn.setAttribute("id", "contact-btn-open");
    contactBtn.setAttribute("class", "contact_button main-focus");
    contactBtn.setAttribute("aria-label", "Contactez moi");
    contactBtn.setAttribute("tabindex", 1);
    contactBtn.textContent = "Contactez moi";

    img.setAttribute("src", picture);
    img.setAttribute("alt", " ");
    img.setAttribute("tabindex", 1);
    img.setAttribute("class", "main-focus");

    h2.setAttribute("id", `photographer-name-${id}`);
    h2.setAttribute("tabindex", 1);
    h2.setAttribute("class", "main-focus");
    h2.textContent = name;

    localisation.textContent = `${city}, ${country}`;
    localisation.setAttribute("class", "localisation");

    description.textContent = tagline;
    description.setAttribute("class", "description");

    dailyRate.textContent = `${price}€/jour`;
    dailyRate.setAttribute("class", "daily-rate");

    paragraphContainerPhotographer.appendChild(localisation);
    paragraphContainerPhotographer.appendChild(description);

    information.appendChild(h2);
    information.appendChild(paragraphContainerPhotographer);
    bottomInfo.appendChild(dailyRate);

    return { information, img, contactBtn, bottomInfo };
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
      vid.setAttribute("class", "main-focus");
      const source = document.createElement("source");
      source.setAttribute("src", videoMedia);
      source.setAttribute("type", "video/mp4");
      source.setAttribute("class", "video-element");
      vid.appendChild(source);
      cardVideo.appendChild(vid);
      card.appendChild(cardVideo);
    } else {
      const cardImg = document.createElement("div");
      cardImg.setAttribute("class", "card-media test");
      const img = document.createElement("img");
      img.setAttribute("src", photoMedia);
      img.setAttribute("alt", `${title}, closeup view`);
      img.setAttribute("class", "photo-element main-focus");
      img.setAttribute("tabindex", 0);
      cardImg.appendChild(img);
      card.appendChild(cardImg);
    }

    const titleCard = document.createElement("p");
    const likeNumb = document.createElement("p");
    const likeIcon = document.createElement("i");

    card.setAttribute("class", "card");
    cardInfo.setAttribute("class", "card-info");
    titleCard.setAttribute("class", "card-title main-focus");
    titleCard.setAttribute("tabindex", 0);
    titleCard.textContent = title;
    cardInfoLike.setAttribute("class", "card-like");
    likeNumb.textContent = likes;
    likeIcon.setAttribute("class", "fa-solid fa-heart main-focus");
    likeIcon.setAttribute("aria-label", "likes");
    likeIcon.setAttribute("tabindex", 0);

    cardInfoLike.appendChild(likeNumb);
    cardInfoLike.appendChild(likeIcon);

    cardInfo.appendChild(titleCard);
    cardInfo.appendChild(cardInfoLike);

    card.appendChild(cardInfo);
    return card;
  }

  return { getPortfolioCard };
}
