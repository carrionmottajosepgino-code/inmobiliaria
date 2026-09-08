const form = document.querySelector("#meeting-form");
const dateInput = form.elements.date;
const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

const getMeetingData = () => ({
  name: form.elements.name.value.trim(),
  email: form.elements.email.value.trim(),
  need: form.elements.need.value,
  date: form.elements.date.value,
  time: form.elements.time.value,
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const meeting = getMeetingData();
  const message = form.querySelector(".form-message");
  const subject = encodeURIComponent(`Reunión YLLEVEN - ${meeting.name}`);
  const body = encodeURIComponent(`Hola, soy ${meeting.name}.\n\nQuiero ${meeting.need.toLowerCase()}.\nFecha preferida: ${meeting.date} a las ${meeting.time}.\nMi email: ${meeting.email}`);

  message.textContent = "Abriendo tu correo para confirmar la reunión...";
  window.location.href = `mailto:hola@ylleven.es?subject=${subject}&body=${body}`;
  form.reset();
  dateInput.min = today;
});

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  mobileNav.classList.toggle("is-open", !expanded);
  menuButton.textContent = expanded ? "☰" : "×";
});

mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("is-open");
  menuButton.textContent = "☰";
}));

const modal = document.querySelector(".property-modal");
const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = "";
};

document.querySelectorAll(".property-card").forEach((card) => {
  const openModal = () => {
    modal.querySelector("#modal-title").textContent = card.dataset.title;
    modal.querySelector(".modal-location").textContent = card.dataset.location;
    modal.querySelector(".modal-description").textContent = card.dataset.description;
  modal.querySelector(".modal-price").textContent = card.dataset.price;
    modal.querySelector(".modal-size").textContent = card.dataset.size;
    modal.querySelector(".modal-rooms").textContent = card.dataset.rooms;
    modal.querySelector(".modal-baths").textContent = card.dataset.baths;
    modal.querySelector(".modal-extra").textContent = card.dataset.extra;
    modal.querySelector(".modal-image").style.backgroundImage = getComputedStyle(card.querySelector(".property-image")).backgroundImage;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  };
  card.addEventListener("click", openModal);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openModal(); }
  });
});

modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
modal.querySelector(".modal-cta").addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

const whatsappLink = document.querySelector(".whatsapp-link");
whatsappLink.addEventListener("click", (event) => {
  event.preventDefault();
  const meeting = getMeetingData();
  const text = encodeURIComponent(`Hola YLLEVEN, soy ${meeting.name || ""}. Me interesa ${meeting.need.toLowerCase()}${meeting.date ? ` y quisiera reunirnos el ${meeting.date} a las ${meeting.time}` : ""}.`);
  window.open(`https://wa.me/34612345678?text=${text}`, "_blank", "noopener,noreferrer");
});

const video = document.querySelector(".video-frame video");
video.addEventListener("loadeddata", () => video.closest(".video-frame").classList.add("has-video"));
