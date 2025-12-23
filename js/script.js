/* ================================
   Mobile Navigation Toggle
================================ */
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

/* ================================
   Stock Number Counter (Home Page)
================================ */
const counters = document.querySelectorAll(".stock-number");

function animateCounters() {
  counters.forEach(counter => {
    const target = Number(counter.getAttribute("data-count"));
    let current = 0;
    const speed = 60;

    function update() {
      const increment = Math.ceil(target / speed);
      current += increment;

      if (current < target) {
        counter.textContent = current;
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    update();
  });
}

window.addEventListener("load", animateCounters);

/* ================================
   Circular Counter + Bar Chart (Home)
================================ */
function animateRingAndBars() {
  // Circular ring
  const ring = document.querySelector(".ring");
  if (ring) {
    const target = Number(ring.getAttribute("data-progress")) || 0;
    const valueEl = ring.querySelector(".ring-value");
    let current = 0;

    const step = () => {
      current += 1;
      ring.style.setProperty("--p", current);

      if (valueEl) valueEl.textContent = `${current}%`;

      if (current < target) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  // Bar chart fills
  const bars = document.querySelectorAll(".bar-fill");
  if (bars.length) {
    bars.forEach(bar => {
      const v = Number(bar.getAttribute("data-value")) || 0;
      // small delay makes it feel smoother
      setTimeout(() => { bar.style.width = `${v}%`; }, 150);
    });
  }
}

window.addEventListener("load", animateRingAndBars);

/* ================================
   Services Page Metrics + Bars
================================ */
function animateServiceDashboard() {
  // Number counters
  const metrics = document.querySelectorAll(".metric-value");
  metrics.forEach(el => {
    const target = Number(el.getAttribute("data-count"));
    let current = 0;

    const step = () => {
      current += Math.ceil(target / 50);
      if (current < target) {
        el.textContent = current;
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    step();
  });

  // Status bars
  const bars = document.querySelectorAll(".status-fill");
  bars.forEach(bar => {
    const v = bar.getAttribute("data-value");
    setTimeout(() => {
      bar.style.width = v + "%";
    }, 200);
  });
}

window.addEventListener("load", animateServiceDashboard);

/* ================================
   Media Gallery (Preview + Next/Prev)
================================ */
(function mediaGallery() {
  const previewImg = document.getElementById("previewImg");
  const previewCaption = document.getElementById("previewCaption");
  const thumbs = Array.from(document.querySelectorAll(".thumb"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!previewImg || !previewCaption || thumbs.length === 0) return;

  let currentIndex = 0;

  function showIndex(i) {
    const btn = thumbs[i];
    if (!btn) return;

    const img = btn.getAttribute("data-img");
    const alt = btn.getAttribute("data-alt");
    const cap = btn.getAttribute("data-cap");

    previewImg.src = img;
    previewImg.alt = alt;
    previewCaption.textContent = cap;

    currentIndex = i;
  }

  thumbs.forEach((btn, i) => {
    btn.addEventListener("click", () => showIndex(i));
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const next = (currentIndex - 1 + thumbs.length) % thumbs.length;
      showIndex(next);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const next = (currentIndex + 1) % thumbs.length;
      showIndex(next);
    });
  }

  // Set initial state based on first thumbnail (consistent)
  showIndex(0);
})();
