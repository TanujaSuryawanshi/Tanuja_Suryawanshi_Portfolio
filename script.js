// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links.........
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector("textarea").value;

    // Basic validation
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Simulate form submission (replace with actual form handling)
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Skill item hover effects
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.05)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Certificate card hover effects
document.querySelectorAll(".certificate-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    typeWriter(heroTitle, originalText, 50);
  }
});

// Add loading animation for buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (
      this.classList.contains("btn-primary") ||
      this.classList.contains("btn-secondary")
    ) {
      // Add ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll to top functionality
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #6366f1;
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Hover effect for scroll to top button
scrollToTopBtn.addEventListener("mouseenter", function () {
  this.style.transform = "scale(1.1)";
  this.style.background = "#4f46e5";
});

scrollToTopBtn.addEventListener("mouseleave", function () {
  this.style.transform = "scale(1)";
  this.style.background = "#6366f1";
});

// Resume upload and preview functionality
const resumeUpload = document.getElementById("resume-upload");
const resumePreview = document.getElementById("resume-preview");
const resumeContent = document.getElementById("resume-content");
const closePreview = document.getElementById("close-preview");

if (resumeUpload) {
  resumeUpload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        // For PDF files, show a message
        resumeContent.innerHTML = `
          <h4>${file.name}</h4>
          <p>PDF file uploaded successfully!</p>
          <p>File size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>Note: PDF preview is not available in the browser. You can download and view the file.</p>
        `;
      } else if (file.type.includes("text") || file.type.includes("document")) {
        // For text-based files, try to read content
        const reader = new FileReader();
        reader.onload = function (e) {
          resumeContent.innerHTML = `
            <h4>${file.name}</h4>
            <p>File size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <div style="white-space: pre-wrap; font-family: monospace; font-size: 0.9rem;">${
              e.target.result
            }</div>
          `;
        };
        reader.readAsText(file);
      } else {
        resumeContent.innerHTML = `
          <h4>${file.name}</h4>
          <p>File uploaded successfully!</p>
          <p>File size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>File type: ${file.type}</p>
        `;
      }
      resumePreview.style.display = "block";
    }
  });
}

if (closePreview) {
  closePreview.addEventListener("click", function () {
    resumePreview.style.display = "none";
    resumeUpload.value = "";
  });
}

// Add active state to navigation links based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);

// Add CSS for active navigation link
const navStyle = document.createElement("style");
navStyle.textContent = `
    .nav-link.active {
        color: #6366f1 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);
