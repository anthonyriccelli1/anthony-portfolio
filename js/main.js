// ===== Navigation Active Link Highlighting =====
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// ===== Sticky Header on Scroll =====
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  
  lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const nav = document.querySelector("nav");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    nav.classList.toggle("mobile-open");
    const spans = mobileMenuToggle.querySelectorAll("span");
    spans.forEach((span, index) => {
      if (nav.classList.contains("mobile-open")) {
        if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)";
        if (index === 1) span.style.opacity = "0";
        if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        span.style.transform = "";
        span.style.opacity = "1";
      }
    });
  });

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("mobile-open");
      const spans = mobileMenuToggle.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.transform = "";
        span.style.opacity = "1";
      });
    });
  });
}

// ===== Dark Mode Toggle =====
const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  if (themeIcon) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
} else {
  if (themeIcon) {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

// Toggle theme with smooth transition
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    if (themeIcon) {
      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      } else {
        localStorage.setItem("theme", "light");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    } else {
      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    }
  });
}

// ===== Typewriter Effect for Hero Title =====
function typewriterEffect(element, text, speed = 100) {
  if (!element) return;
  
  element.textContent = "";
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Apply typewriter effect to hero title
const heroTitle = document.getElementById("hero-title");
if (heroTitle) {
  const originalText = heroTitle.textContent;
  typewriterEffect(heroTitle, originalText, 80);
}

// ===== Scroll-Triggered Animations (Intersection Observer) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      
      // Animate skill bars when skills section is visible
      if (entry.target.classList.contains("skill-item")) {
        const skillBar = entry.target.querySelector(".skill-bar");
        if (skillBar) {
          const width = skillBar.getAttribute("data-width") || "0";
          setTimeout(() => {
            skillBar.style.width = width + "%";
          }, 200);
        }
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with .reveal class
document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// Observe skill items separately for progress bar animation
document.querySelectorAll(".skill-item").forEach((el) => {
  observer.observe(el);
});

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});

// ===== Contact Form Validation and Submission =====
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    
    // Reset form message
    formMessage.className = "form-message";
    formMessage.textContent = "";
    
    // Validation
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Remove previous error states
    contactForm.querySelectorAll(".form-group input, .form-group textarea").forEach((input) => {
      input.style.borderColor = "";
    });
    
    if (!name) {
      showFieldError("name", "Name is required");
      isValid = false;
    }
    
    if (!email || !emailRegex.test(email)) {
      showFieldError("email", "Valid email is required");
      isValid = false;
    }
    
    if (!subject) {
      showFieldError("subject", "Subject is required");
      isValid = false;
    }
    
    if (!message || message.length < 10) {
      showFieldError("message", "Message must be at least 10 characters");
      isValid = false;
    }
    
    if (!isValid) {
      showFormMessage("Please fix the errors above.", "error");
      return;
    }
    
    // Simulate form submission (replace with actual API call)
    showFormMessage("Sending message...", "success");
    
    // In a real implementation, you would send this to a backend
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      showFormMessage("Thank you! Your message has been sent. I'll get back to you soon.", "success");
      contactForm.reset();
      
      // Scroll to message
      formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 1500);
  });
  
  // Real-time validation
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateField(input);
    });
    
    input.addEventListener("input", () => {
      if (input.style.borderColor === "rgb(220, 38, 38)") {
        validateField(input);
      }
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldId = field.id;
  let isValid = true;
  
  field.style.borderColor = "";
  
  switch (fieldId) {
    case "name":
      if (!value) {
        showFieldError(fieldId, "Name is required");
        isValid = false;
      }
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        showFieldError(fieldId, "Valid email is required");
        isValid = false;
      }
      break;
    case "subject":
      if (!value) {
        showFieldError(fieldId, "Subject is required");
        isValid = false;
      }
      break;
    case "message":
      if (!value || value.length < 10) {
        showFieldError(fieldId, "Message must be at least 10 characters");
        isValid = false;
      }
      break;
  }
  
  return isValid;
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.style.borderColor = "#dc2626";
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.style.color = "#dc2626";
    errorDiv.style.fontSize = "0.85rem";
    errorDiv.style.marginTop = "0.25rem";
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
  }
}

function showFormMessage(message, type) {
  if (formMessage) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";
    
    // Auto-hide after 5 seconds for success messages
    if (type === "success" && message.includes("Thank you")) {
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }
  }
}

// ===== Parallax Effect (Subtle) =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-background");
  
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ===== Page Load Animation =====
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = "1";
  }, 100);
});

// ===== Skill Bars Animation on Scroll =====
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");
  skillBars.forEach((bar) => {
    const skillItem = bar.closest(".skill-item");
    if (!skillItem) return;
    
    const width = bar.getAttribute("data-width") || "0";
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });
    
    observer.observe(skillItem);
  });
}

// Initialize skill bars animation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateSkillBars);
} else {
  animateSkillBars();
}

// ===== Smooth Page Transitions =====
document.querySelectorAll("nav a, .btn").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("http")) {
      // Add fade out effect (optional, can be enhanced)
      document.body.style.opacity = "0.9";
    }
  });
});

// ===== Console Easter Egg =====
console.log("%c👋 Hi there! Interested in the code?", "color: #6366f1; font-size: 16px; font-weight: bold;");
console.log("%cCheck out the source code on GitHub: https://github.com/anthonyriccelli1/anthony-portfolio", "color: #8b5cf6; font-size: 12px;");
