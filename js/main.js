/* ==========================================================
   Blue Cyber Portfolio - main.js
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initTerminal();
  initSkills();
  initContactForm();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------- Navbar: mobile toggle + active link ---------- */
function initNavbar() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = links.querySelectorAll('a:not(.btn)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ---------- Hero terminal: types out a short profile ---------- */
function initTerminal() {
  const body = document.getElementById("terminalBody");
  const lines = [
    { type: "cmd", text: "whoami" },
    { type: "out", html: '<span class="val">Your Name</span>' },
    { type: "cmd", text: "cat profile.json" },
    { type: "out", html: '{\n  <span class="key">"role"</span>: <span class="val">"Web Developer"</span>,\n  <span class="key">"stack"</span>: <span class="val">["Laravel", "Inertia", "React"]</span>,\n  <span class="key">"status"</span>: <span class="val">"open to opportunities"</span>\n}' },
    { type: "cmd", text: "echo $MISSION" },
    { type: "out", html: '<span class="val">Build useful things for the web.</span>' }
  ];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cursor = '<span class="cursor"></span>';
  let output = "";

  // Show everything instantly when the user prefers reduced motion
  if (reduceMotion) {
    lines.forEach((l) => {
      output += l.type === "cmd" ? `<span class="prompt">$ </span>${l.text}\n` : `${l.html}\n`;
    });
    body.innerHTML = output + '<span class="prompt">$ </span>' + cursor;
    return;
  }

  let lineIndex = 0;

  function nextLine() {
    if (lineIndex >= lines.length) {
      body.innerHTML = output + '<span class="prompt">$ </span>' + cursor;
      return;
    }
    const line = lines[lineIndex++];

    if (line.type === "out") {
      output += line.html + "\n";
      body.innerHTML = output + cursor;
      setTimeout(nextLine, 350);
      return;
    }

    // Type the command one character at a time
    let i = 0;
    const timer = setInterval(() => {
      i++;
      body.innerHTML = output + '<span class="prompt">$ </span>' + line.text.slice(0, i) + cursor;
      if (i >= line.text.length) {
        clearInterval(timer);
        output += '<span class="prompt">$ </span>' + line.text + "\n";
        setTimeout(nextLine, 300);
      }
    }, 55);
  }

  nextLine();
}

/* ---------- Skills: render from data.js, filter by category ---------- */
function initSkills() {
  const grid = document.getElementById("skillsGrid");
  const filterBox = document.getElementById("skillFilters");
  const sorted = [...skills].sort((a, b) => a.order - b.order);
  const categories = ["All", ...new Set(sorted.map((s) => s.category))];
  let active = "All";

  function render() {
    const visible = active === "All" ? sorted : sorted.filter((s) => s.category === active);

    grid.innerHTML = visible
      .map(
        (s) => `
        <article class="skill">
          <div class="skill__head">
            <span class="skill__icon" aria-hidden="true">${escapeHtml(s.icon)}</span>
            <h3 class="skill__name">${escapeHtml(s.name)}</h3>
            <span class="skill__level">${s.level}%</span>
          </div>
          <div class="skill__bar" role="progressbar" aria-label="${escapeHtml(s.name)} proficiency"
               aria-valuemin="0" aria-valuemax="100" aria-valuenow="${s.level}">
            <span class="skill__fill" data-level="${s.level}"></span>
          </div>
        </article>`
      )
      .join("");

    // Fill the bars on the next frame so the CSS transition runs
    requestAnimationFrame(() => {
      grid.querySelectorAll(".skill__fill").forEach((bar) => {
        bar.style.width = bar.dataset.level + "%";
      });
    });
  }

  function renderFilters() {
    filterBox.innerHTML = categories
      .map(
        (c) =>
          `<button type="button" class="filter${c === active ? " is-active" : ""}" data-category="${c}" aria-pressed="${c === active}">${c}</button>`
      )
      .join("");
  }

  filterBox.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    active = btn.dataset.category;
    renderFilters();
    render();
  });

  renderFilters();

  // Animate the bars the first time the section scrolls into view
  const section = document.getElementById("skills");
  const once = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        render();
        once.disconnect();
      }
    },
    { threshold: 0.15 }
  );
  once.observe(section);
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = String(value);
  return div.innerHTML;
}

/* ---------- Contact form: client-side validation ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  const rules = {
    name: (v) => (v.trim().length < 2 ? "Enter your name (at least 2 characters)." : ""),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter a valid email address, like name@example.com."),
    message: (v) => (v.trim().length < 10 ? "Write a message of at least 10 characters." : "")
  };

  function validateField(name) {
    const input = form.elements[name];
    const error = rules[name](input.value);
    document.getElementById(name + "Error").textContent = error;
    input.closest(".field").classList.toggle("has-error", Boolean(error));
    return !error;
  }

  Object.keys(rules).forEach((name) => {
    form.elements[name].addEventListener("blur", () => validateField(name));
    form.elements[name].addEventListener("input", () => {
      if (form.elements[name].closest(".field").classList.contains("has-error")) validateField(name);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";

    // Validate every field (do not stop at the first error)
    const results = Object.keys(rules).map(validateField);
    if (results.includes(false)) return;

    // Demo only: no backend yet. This will become a Laravel route later.
    status.textContent = "Thanks! Your message is ready to send once the backend is connected.";
    form.reset();
  });
}