// close modal with close btn enter
document
  .getElementById("close-btn")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      closeModal();
    }
  });

// close modal with escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// eslint-disable-next-line no-unused-vars
async function displayModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  const modalFocus = document.querySelectorAll(".modal-focus");
  const closeBtnModal = document.getElementById("close-btn");
  const mainFocus = document.querySelectorAll(".main-focus");
  const trieElement = document.querySelector(".order-by");
  const selectElement = document.querySelector(".select");

  modal.style.display = "block";
  modal.setAttribute("aria-hidden", false);
  main.setAttribute("aria-hidden", true);

  modalFocus.forEach((element) => {
    element.setAttribute("tabindex", 0);
  });

  mainFocus.forEach((element) => {
    element.setAttribute("tabindex", -1);
  });
  trieElement.setAttribute("tabindex", -1);
  selectElement.setAttribute("tabindex", -1);

  closeBtnModal.setAttribute("tabindex", 0);
}

async function closeModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  const modalFocus = document.querySelectorAll(".modal-focus");
  const mainFocus = document.querySelectorAll(".main-focus");
  const trieElement = document.querySelector(".order-by");
  const selectElement = document.querySelector(".select");

  modal.setAttribute("aria-hidden", true);
  main.setAttribute("aria-hidden", false);

  mainFocus.forEach((element) => {
    element.setAttribute("tabindex", 0);
  });
  trieElement.setAttribute("tabindex", 0);
  selectElement.setAttribute("tabindex", 0);

  modalFocus.forEach((element) => {
    element.setAttribute("tabindex", -1);
  });

  modal.style.display = "none";
}

// close modal with close btn click
document
  .getElementById("close-btn")
  .addEventListener("click", () => closeModal());

// prevent default form
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // submit button
  const sendBtn = document.querySelector(".submit-btn");
  sendBtn.addEventListener("click", () => {
    if (first.value && last.value && email.value && message.value) {
      console.log(
        `Prénom: ${first.value}, Nom: ${first.value}, Email: ${email.value}, Message: ${message.value}`
      );
    }
    const inputData = document.querySelectorAll(".input-data");
    inputData.forEach((input) => (input.value = ""));
  });
});
