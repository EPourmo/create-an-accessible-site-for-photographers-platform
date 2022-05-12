// display modal
document
  .getElementById("contact-btn-open")
  .addEventListener("click", displayModal);

// close modal with close btn click
document.getElementById("close-btn").addEventListener("click", closeModal);

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

function displayModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  const modalFocus = document.querySelectorAll(".modal-focus");
  const closeBtnModal = document.getElementById("close-btn");
  const mainFocus = document.querySelectorAll(".main-focus");

  modal.style.display = "block";
  modal.setAttribute("aria-hidden", false);
  main.setAttribute("aria-hidden", true);

  modalFocus.forEach((element) => {
    element.setAttribute("tabindex", 1);
  });

  mainFocus.forEach((element) => {
    element.setAttribute("tabindex", -1);
  });

  closeBtnModal.setAttribute("tabindex", 2);
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  const modalFocus = document.querySelectorAll(".modal-focus");
  const mainFocus = document.querySelectorAll(".main-focus");
  const lastFocus = document.querySelectorAll(".last-focus");

  modal.setAttribute("aria-hidden", true);
  main.setAttribute("aria-hidden", false);

  mainFocus.forEach((element) => {
    element.setAttribute("tabindex", 1);
  });

  lastFocus.forEach((element) => {
    element.setAttribute("tabindex", 2);
  });

  modalFocus.forEach((element) => {
    element.setAttribute("tabindex", -1);
  });

  modal.style.display = "none";
}

// prevent default form
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (first.value && last.value && email.value && message.value) {
    console.log(
      `Prénom: ${first.value}, Nom: ${first.value}, Email: ${email.value}, Message: ${message.value}`
    );
  }

  // submit button
  // const sendBtn = document.querySelector(".submit-btn");
  // sendBtn.addEventListener("click", () => {
  //   first.value = "";
  //   last.value = "";
  //   email.value = "";
  //   message.value = "";
  // });
});
