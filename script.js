// Gestion de la navbar mobile
const navbarToggle = document.querySelector(".navbar__toggle");
const navbarLinks = document.querySelector(".navbar__links");

if (navbarToggle && navbarLinks) {
  navbarToggle.addEventListener("click", () => {
    const isOpen = navbarLinks.classList.toggle("is-open");
    navbarToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Ferme le menu après un clic sur un lien
  navbarLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navbarLinks.classList.remove("is-open");
      navbarToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Année dynamique dans le footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// Scroll reveal léger pour les éléments marqués [data-scroll]
const scrollElements = document.querySelectorAll("[data-scroll]");

if ("IntersectionObserver" in window && scrollElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  scrollElements.forEach((el) => observer.observe(el));
} else {
  scrollElements.forEach((el) => el.classList.add("is-visible"));
}

// Formulaire de contact : envoi réel via fetch vers un endpoint externe (type Formspree)
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (!(nameInput instanceof HTMLInputElement) || !(emailInput instanceof HTMLInputElement) || !(messageInput instanceof HTMLTextAreaElement)) {
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent = "Merci de remplir tous les champs.";
        formStatus.classList.remove("form-status--success");
        formStatus.classList.add("form-status--error");
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = "Envoi en cours...";
      formStatus.classList.remove("form-status--error", "form-status--success");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    const endpointUrl = "https://formspree.io/f/manrbpbz";

    fetch(endpointUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          if (formStatus) {
            formStatus.textContent = "Merci, votre message a bien été envoyé.";
            formStatus.classList.remove("form-status--error");
            formStatus.classList.add("form-status--success");
          }
          if (form instanceof HTMLFormElement) {
            form.reset();
          }
        } else {
          return response.json().catch(() => ({})).then(() => {
            throw new Error("Erreur lors de l'envoi");
          });
        }
      })
      .catch(() => {
        if (formStatus) {
          formStatus.textContent = "Une erreur est survenue. Vous pouvez aussi m'écrire directement par email.";
          formStatus.classList.remove("form-status--success");
          formStatus.classList.add("form-status--error");
        }
      });
  });
}

// Diaporama ALPOS (slides + boutons + puces)
function initSlideshow(idPrefix) {
  const slidesContainer = document.getElementById(`${idPrefix}-slides`);
  const dotsContainer = document.getElementById(`${idPrefix}-dots`);
  const prevBtn = document.querySelector(`[data-slideshow-prev="${idPrefix}"]`);
  const nextBtn = document.querySelector(`[data-slideshow-next="${idPrefix}"]`);

  if (!slidesContainer || !dotsContainer || !prevBtn || !nextBtn) return;

  const slides = Array.from(slidesContainer.children);
  if (slides.length === 0) return;

  let currentIndex = 0;

  // Création des puces
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "slideshow__dot" + (index === 0 ? " slideshow__dot--active" : "");
    dot.setAttribute("data-slideshow-dot", `${index}`);
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function updateSlides(newIndex) {
    slides[currentIndex].classList.remove("slideshow__slide--active");
    dots[currentIndex].classList.remove("slideshow__dot--active");

    currentIndex = (newIndex + slides.length) % slides.length;

    slides[currentIndex].classList.add("slideshow__slide--active");
    dots[currentIndex].classList.add("slideshow__dot--active");
  }

  prevBtn.addEventListener("click", () => {
    updateSlides(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    updateSlides(currentIndex + 1);
  });

  dotsContainer.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-slideshow-dot")) {
      const index = Number(event.target.getAttribute("data-slideshow-dot"));
      if (!Number.isNaN(index)) {
        updateSlides(index);
      }
    }
  });
}

initSlideshow("alpos");
