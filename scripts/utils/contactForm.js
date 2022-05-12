// display modal
document
  .getElementById("contact-btn-open")
  .addEventListener("click", displayModal);

// close modal
document.getElementById("close-btn").addEventListener("click", closeModal);

// close modal with escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

function displayModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  const inputName = document.getElementById("first");
  // const closeModal = document.querySelector(".close-btn");

  modal.style.display = "block";

  modal.setAttribute("aria-hidden", false);
  main.setAttribute("aria-hidden", true);
  inputName.setAttribute("tabindex", 0);
  // closeModal.focus();
  inputName.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");

  modal.setAttribute("aria-hidden", true);
  main.setAttribute("aria-hidden", false);

  modal.style.display = "none";
  main.focus();
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
