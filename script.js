// ===== LOADER =====
const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  loader.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", () => {

  // ===== FLOATING PARTICLES =====
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 * 5 + "%";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particle.style.animationDuration = (Math.random() * 10 + 8) + "s";
    particle.style.width = particle.style.height = Math.random() * 4 + 2 + "px";
    document.body.appendChild(particle);
  }

  // ===== TYPING ANIMATION =====
  const roles = ["Front-End Developer", "UI/UX Designer", "Linux & Python Scripter"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.querySelector(".tagline");

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex--);
    } else {
      typingEl.textContent = current.substring(0, charIndex++);
    }
    if (!isDeleting && charIndex === current.length + 1) {
      setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();

  // ===== SCROLL REVEAL =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section:not(#hero)").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
  });

  // ===== ACTIVE NAV ON SCROLL =====
  const sections = document.querySelectorAll("section");
  const navLinkItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navLinkItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== COPY EMAIL =====
  const emailBtn = document.getElementById("emailBtn");

  emailBtn.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("amalas2875@gmail.com").then(() => {
      emailBtn.innerHTML = "<span>✓ Email Copied!</span>";
      setTimeout(() => {
        emailBtn.innerHTML = "<span class='contact-icon'>✉</span><span>Email Me</span>";
      }, 2000);
    });
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navMenu.classList.toggle("open");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navMenu.classList.remove("open");
    });
  });

});