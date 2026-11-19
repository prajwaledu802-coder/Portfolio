// ---------- Theme (light / dark) ----------
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch (e) {}
  if (themeBtn) themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

if (themeBtn) {
  setTheme(root.getAttribute("data-theme") || "light");
  themeBtn.addEventListener("click", () => {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
}

// ---------- Mobile navigation ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

// ---------- Header border on scroll ----------
const header = document.querySelector(".header");
if (header) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ---------- Scroll reveal ----------
const reveals = document.querySelectorAll(".reveal");
if (reveals.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => revealObserver.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

// ---------- Skill bars fill on scroll ----------
const bars = document.querySelectorAll(".bar i");
if (bars.length) {
  const fill = (el) => { el.style.width = el.style.getPropertyValue("--level"); };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { fill(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    bars.forEach((b) => io.observe(b));
  } else {
    bars.forEach(fill);
  }
}

// ---------- Footer year ----------
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
