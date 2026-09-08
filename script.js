// ——— Retour en haut ———
// #top est porté par le header en position: fixed ; un lien d'ancre natif
// vers un élément fixed ne scrolle pas (il est toujours "déjà visible").
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ——— Navbar : scroll effect ———
const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  const onScroll = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ——— Navbar : mobile toggle ———
const navbarToggle = document.querySelector(".navbar__toggle");
const navbarLinks = document.querySelector(".navbar__links");

if (navbarToggle && navbarLinks) {
  navbarToggle.addEventListener("click", () => {
    const isOpen = navbarLinks.classList.toggle("is-open");
    navbarToggle.classList.toggle("is-active", isOpen);
    navbarToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked
  navbarLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navbarLinks.classList.remove("is-open");
      navbarToggle.classList.remove("is-active");
      navbarToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ——— Dynamic year ———
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// ——— Scroll reveal with stagger support ———
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
      rootMargin: "0px 0px -40px 0px",
    }
  );

  scrollElements.forEach((el) => observer.observe(el));
} else {
  scrollElements.forEach((el) => el.classList.add("is-visible"));
}

// ——— i18n : traduction automatique FR/EN ———
const I18N_STORAGE_KEY = "portfolio-lang";

const formMessages = {
  fr: {
    missingFields: "Merci de remplir tous les champs.",
    sending: "Envoi en cours...",
    success: "Merci, votre message a bien été envoyé.",
    error: "Une erreur est survenue. Vous pouvez aussi m'écrire directement par email.",
  },
  en: {
    missingFields: "Please fill in all fields.",
    sending: "Sending...",
    success: "Thank you, your message has been sent.",
    error: "Something went wrong. You can also email me directly.",
  },
};

const translationsEn = {
  "label-about": "About",
  "label-skills": "Skills",
  "label-projects": "Projects",
  "label-experience": "Experience",
  "label-contact": "Contact",
  "nav-toggle-aria": "Open menu",
  "nav-print-btn": "Print resume",

  "hero-kicker": "Engineering student · Computer Science & E-health",
  "hero-subtitle": `4th-year engineering student at <strong>ISIS Castres</strong>, in <strong>Computer Science</strong> specializing in <strong>Health Information Systems</strong>, and following an advanced specialization track in <strong>Artificial Intelligence</strong>. I design software and data solutions to improve patient care pathways.`,
  "hero-btn-projects": "View my projects",
  "hero-btn-contact": "Contact me",
  "hero-avatar-alt": "Portrait of Enzo Ferrier",
  "hero-meta-location": "Castres, Occitanie, France",
  "hero-meta-field": "Computer Science & E-health",
  "marquee-text": "Web Development — Information Systems — E-health — Data Science — Python — Docker — DevOps — Artificial Intelligence —&nbsp;",

  "about-title": "Who am I?",
  "about-p1": `I am a <strong>4th-year engineering student</strong> at ISIS Castres, in <strong>Computer Science</strong>, specializing in <strong>Health Information Systems</strong>. I am also following an advanced specialization track in <strong>Artificial Intelligence</strong>, which I aim to put to use for <strong>improving healthcare</strong>, <strong>hospital workflows</strong>, and the daily work of caregivers.`,
  "about-p2": `Through academic projects and professional experience in hospital settings, I am building a dual skill set: <strong>technical</strong> (development, data, Python, e-health architectures) and <strong>business/domain</strong> (IAM, hospital information systems, workstation ergonomics).`,
  "about-li1": "<strong>Specialty:</strong> Computer Science & Health Information Systems",
  "about-li2": "<strong>Specialization track:</strong> Artificial Intelligence",
  "about-li3": "<strong>Field:</strong> Hospital information systems & e-health",
  "about-li4": "<strong>Strengths:</strong> Autonomy, rigor, teamwork in a hospital setting",
  "about-li5": "<strong>Interests:</strong> Tennis, video games, healthcare innovation",

  "skills-title": "What I can do",
  "skill1-h3": "Development & DevOps",
  "skill1-p": "Application development and deployment of technical solutions.",
  "skill2-h3": "Health Information Systems",
  "skill2-p": "Understanding of hospital IT architectures and business workflows.",
  "tag-hospital-workflows": "Hospital workflows",
  "tag-interop": "Interoperability",
  "tag-ehealth": "E-health",
  "skill3-h3": `Data Science & AI <span class="skill-card__note">(specialization track)</span>`,
  "skill3-p": "Advanced Machine Learning models applied to healthcare.",
  "tag-predictive": "Predictive analytics",
  "tag-health-data": "Health data processing",
  "skill4-h3": "Project Management & Soft Skills",
  "skill4-p": "Cross-functional teamwork and coordination in a hospital environment.",
  "tag-autonomy": "Autonomy",
  "tag-analysis": "Analytical thinking",

  "languages-title": "Languages",
  "langrow-french": `<span>French</span><span class="languages-list__level">Native</span>`,
  "langrow-english": `<span>English</span><span class="languages-list__level">Good level</span>`,
  "langrow-spanish": `<span>Spanish</span><span class="languages-list__level">Basic</span>`,
  "langrow-chinese": `<span>Chinese</span><span class="languages-list__level">Basic</span>`,

  "projects-title": "Selected projects",
  "projects-subtitle": "A selection of my academic and personal projects in web development, data, and e-health.",

  "p1-title": `Nuit de l'Info 2024–2025 – "Resilient Digital Village"`,
  "p1-role": "Role: Lead Developer",
  "p1-p1": `Participated in the <strong>Nuit de l'Info</strong> hackathon, building a web application around the theme "Resilient Digital Village." Designed the interface, implemented responsive integration, and built interactive features.`,
  "p1-p2": `The project highlights the <strong>digital resilience</strong> of a connected village, with a focus on usability and accessibility.`,
  "btn-view-demo": "View demo",
  "btn-view-code": "View code (GitHub)",

  "p2-title": "The Hospital – Showcasing ISIS Video Productions",
  "p2-role": "Role: Full-Stack Developer (supervised team project, team of 3)",
  "p2-p1": `Designed and developed a <strong>web application</strong> to catalog and showcase films made by ISIS Castres students as part of their English classes (the "The Hospital" project). The site offers a public interface for browsing films (metadata, participants, anecdotes, comments) as well as a <strong>secure admin area</strong> for managing content.`,
  "p2-p2": `From requirements to production: needs analysis, Figma mockups, database modeling, development of a documented <strong>REST API</strong>, then containerized deployment with <strong>GitLab CI/CD</strong> and <strong>Kubernetes</strong> orchestration.`,

  "p3-role": "Role: AI Developer",
  "slide1-h4": "Context",
  "slide1-p": `ALPOS is a project for <strong>detecting poor posture</strong> among home care workers, aiming to prevent musculoskeletal disorders and improve workplace ergonomics.`,
  "slide2-h4": "AI approach",
  "slide2-p": `Designed and trained <strong>Machine Learning</strong> models from motion data, experimented with several algorithms, and built a processing pipeline.`,
  "slide3-h4": "Impact & e-health",
  "slide3-p": `Contributed to e-health innovation by providing an ergonomic analysis tool for caregivers and home-care organizations, with careful consideration of <strong>AI ethics</strong> in healthcare.`,
  "slide-prev-aria": "Previous slide",
  "slide-next-aria": "Next slide",

  "experience-title": "Professional experience",
  "t1-h3": "Manual Labor Internship – Granits Michel MAFFRE",
  "t1-period": "May 2023",
  "t1-role": "Material handling & processing",
  "t1-li1": "Introduction to the industrial sector and stone-working.",
  "t1-li2": "Handling, cutting, and processing of materials.",

  "t2-h3": "Internship – Centre Hospitalier Intercommunal Castres-Mazamet (CHIC)",
  "t2-period": "April–June 2025 · Castres",
  "t2-role": "Topic: Information Systems & IAM",
  "t2-li1": `Studied and modeled <strong>IAM workflows</strong> for hospital staff.`,
  "t2-li2": `Conducted technical analysis around <strong>Docker</strong> and <strong>Oracle</strong> for tool deployment.`,
  "t2-li3": `Took part in the <strong>Grand Prix Sprint E-Santé</strong> (ALPOS project).`,

  "t3-h3": "Internship – INU Champollion / ISIS – CHART Team",
  "t3-period": "PlaniTime Internship – 2026 · Castres",
  "t3-role": "Subject: Hybrid serious game for nursing training",
  "t3-li1": `Designed and developed <strong>PlaniTime</strong>, a physical/digital serious game training nursing students in <strong>shift planning</strong> and prioritizing care tasks.`,
  "t3-li2": `Instrumented physical board (<strong>Arduino</strong>, PN532 RFID readers, WS2812B LED strips) synchronized in real time with an instructor dashboard and a touchscreen kiosk via <strong>MQTT</strong> and <strong>WebSocket</strong>.`,
  "t3-li3": `Developed the backend (<strong>Node.js/Express</strong>, <strong>MariaDB</strong>) and frontend (<strong>Vue 3</strong>/Vite): a state machine reconstructing piece placement/removal events, live workload calculation by role (RN/CNA) and time slot.`,
  "t3-li4": `Built a content pipeline connecting a narrative scripting tool (<strong>Articy:draft</strong>) to a custom XML converter, all the way to the physical fabrication of the game pieces.`,
  "t3-li5": `Improved hardware reliability (NFC reader diagnostics) and built an end-to-end test scenario simulating RFID events over HTTP without a connected physical board.`,

  "contact-title": "Let's work together",
  "contact-subtitle": "Interested in an internship, a collaboration around health informatics, or just want to chat? Send me a message.",
  "label-name": "Name",
  "btn-send": "Send",
  "contact-info-title": "Contact details",
  "label-location": "Location",
  "contact-note": "I'm open to internship, apprenticeship, or project opportunities in computer science, data, and e-health.",

  "footer-rights": "All rights reserved.",
  "footer-back-to-top": "Back to top",

  "cv-contact-title": "Contact",
  "cv-lang-scale-note": "CEFR levels (A1–C2)",
  "cv-lang-fr-name": "French",
  "cv-lang-en-name": "English",
  "cv-lang-es-name": "Spanish",
  "cv-lang-zh-name": "Chinese",
  "cv-level-native": "C2 · Native language",
  "cv-skill-1": "Python & Web development",
  "cv-skill-3": "Health information systems & IAM",
  "cv-skill-5": "Project management",
  "cv-skill-6": "Autonomy & rigor",
  "cv-interests-title": "Interests",
  "cv-interest-2": "Video games",
  "cv-interest-3": "Healthcare innovation",

  "cv-portfolio-title": "Online portfolio",
  "cv-portfolio-caption": "Scan to see my full portfolio",

  "cv-profile-title": "Profile",
  "cv-profile-text": `4th-year engineering student at ISIS Castres, specializing in Health Information Systems and following an advanced track in Artificial Intelligence. I design software and data solutions to improve care pathways and hospital workflows.`,

  "cv-projects-title": "Projects",
  "cv-project1-desc": `Collaborative web app built during the Nuit de l'Info hackathon, around the theme "Resilient Digital Village": responsive interface and interactive features.`,
  "cv-project2-desc": `App showcasing student video productions: public interface, secure admin area, REST API, and Kubernetes/CI-CD deployment.`,
  "cv-project3-desc": `Poor-posture detection for home care workers: Machine Learning models trained on motion data.`,

  "cv-exp1-title": `Internship – Information Systems & IAM · CHIC <span class="cv-entry-dates">April–June 2025 · Castres</span>`,
  "cv-exp1-b1": "Studied and modeled IAM workflows for hospital staff.",
  "cv-exp1-b2": "Took part in the Grand Prix Sprint E-Santé (ALPOS project).",

  "cv-exp2-title": `Internship – PlaniTime serious game · INU Champollion / ISIS <span class="cv-entry-dates">2026 · Castres</span>`,
  "cv-exp2-b1": "Designed a physical/digital serious game (Arduino, RFID, MQTT) for nursing training.",
  "cv-exp2-b2": "Developed backend/frontend (Node.js, Vue 3) and a narrative content pipeline.",

  "cv-exp3-title": `Manual Labor Internship – Granits Michel MAFFRE <span class="cv-entry-dates">May 2023</span>`,
  "cv-exp3-b1": "Handling, cutting, and processing of materials in the industrial sector.",

  "cv-education-title": "Education",
  "cv-education-title-entry": `Engineering Degree — Computer Science & E-health <span class="cv-entry-dates">2023–2026</span>`,
  "cv-education-text": "ISIS Castres — advanced specialization track in Artificial Intelligence.",
};

const i18nOriginals = new Map();
document.querySelectorAll("[data-i18n]").forEach((el) => {
  if (el.hasAttribute("data-i18n-attr")) {
    const attrName = el.getAttribute("data-i18n-attr");
    i18nOriginals.set(el, el.getAttribute(attrName));
  } else {
    i18nOriginals.set(el, el.innerHTML);
  }
});

let currentLang = "fr";

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "fr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const attrName = el.getAttribute("data-i18n-attr");
    const value = currentLang === "en" && translationsEn[key] !== undefined ? translationsEn[key] : i18nOriginals.get(el);

    if (attrName) {
      el.setAttribute(attrName, value);
    } else {
      el.innerHTML = value;
    }
  });

  document.documentElement.lang = currentLang;

  const langToggleBtn = document.getElementById("lang-toggle-btn");
  if (langToggleBtn) {
    langToggleBtn.textContent = currentLang === "fr" ? "English" : "Français";
    langToggleBtn.setAttribute("aria-label", currentLang === "fr" ? "Switch to English" : "Passer en français");
  }

  document.title = currentLang === "en" ? "Portfolio - Enzo Ferrier (Resume)" : "Portfolio - Enzo Ferrier";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      currentLang === "en"
        ? "Portfolio of Enzo Ferrier, computer science engineering student specializing in e-health, with an advanced specialization track in artificial intelligence."
        : "Portfolio d'Enzo Ferrier, étudiant ingénieur en informatique spécialisé en e-santé, avec un parcours d'approfondissement en intelligence artificielle."
    );
  }

  try {
    localStorage.setItem(I18N_STORAGE_KEY, currentLang);
  } catch (error) {
    // localStorage indisponible (mode privé, etc.) : on ignore silencieusement.
  }
}

const langToggleBtn = document.getElementById("lang-toggle-btn");
if (langToggleBtn) {
  langToggleBtn.addEventListener("click", () => {
    setLanguage(currentLang === "fr" ? "en" : "fr");
  });
}

let savedLang = "fr";
try {
  savedLang = localStorage.getItem(I18N_STORAGE_KEY) || "fr";
} catch (error) {
  savedLang = "fr";
}
setLanguage(savedLang);

// ——— Impression du portfolio au format CV ———
const printCvBtn = document.getElementById("print-cv-btn");
if (printCvBtn) {
  printCvBtn.addEventListener("click", () => {
    window.print();
  });
}

// ——— Contact form (Formspree) ———
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
        formStatus.textContent = formMessages[currentLang].missingFields;
        formStatus.classList.remove("form-status--success");
        formStatus.classList.add("form-status--error");
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = formMessages[currentLang].sending;
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
            formStatus.textContent = formMessages[currentLang].success;
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
          formStatus.textContent = formMessages[currentLang].error;
          formStatus.classList.remove("form-status--success");
          formStatus.classList.add("form-status--error");
        }
      });
  });
}

// ——— Slideshow ALPOS ———
function initSlideshow(idPrefix) {
  const slidesContainer = document.getElementById(`${idPrefix}-slides`);
  const dotsContainer = document.getElementById(`${idPrefix}-dots`);
  const prevBtn = document.querySelector(`[data-slideshow-prev="${idPrefix}"]`);
  const nextBtn = document.querySelector(`[data-slideshow-next="${idPrefix}"]`);

  if (!slidesContainer || !dotsContainer || !prevBtn || !nextBtn) return;

  const slides = Array.from(slidesContainer.children);
  if (slides.length === 0) return;

  let currentIndex = 0;

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
