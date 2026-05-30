const revealTargets = document.querySelectorAll(
  ".section, .stats-band, .phone-showcase, .developer-card, .qr-card"
);

revealTargets.forEach((element) => element.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((element) => observer.observe(element));

const memberCards = document.querySelectorAll("[data-member-card]");

memberCards.forEach((card) => {
  const detail = card.querySelector("details.member-detail");
  const toggle = () => {
    if (!detail) {
      return;
    }
    detail.open = !detail.open;
    const isOpen = detail.open;
    card.classList.toggle("is-open", isOpen);
    card.setAttribute("aria-expanded", String(isOpen));
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a") || event.target.closest("summary")) {
      return;
    }
    toggle();
  });

  detail?.addEventListener("toggle", () => {
    card.classList.toggle("is-open", detail.open);
    card.setAttribute("aria-expanded", String(detail.open));
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  });
});
