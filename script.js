document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navbar = document.getElementById('navbar');
  
  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      if (navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        if (mobileToggle) {
          const icon = mobileToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  });
  
  // Gallery images for gallery page
  const galleryImages = [
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520853504280-249b72dc947c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];
  
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    galleryImages.forEach(src => {
      const div = document.createElement('div');
      div.classList.add('gallery-item');
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Makeup transformation";
      img.loading = "lazy";
      div.appendChild(img);
      galleryGrid.appendChild(div);
    });
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
    
    if (closeLightbox) {
      closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      const feedback = document.getElementById('formFeedback');
      
      if (!name || !email || !message) {
        if (feedback) {
          feedback.textContent = '❌ Please fill all required fields.';
          feedback.style.color = '#b1624b';
        }
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        if (feedback) {
          feedback.textContent = '❌ Please enter a valid email address.';
          feedback.style.color = '#b1624b';
        }
        return;
      }
      
      if (feedback) {
        feedback.textContent = `✨ Thank you ${name}! We'll contact you soon. ✨`;
        feedback.style.color = '#6f8f6b';
      }
      contactForm.reset();
      
      setTimeout(() => {
        if (feedback) feedback.textContent = '';
      }, 4000);
    });
  }
  
  // Scroll animations
  const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .feature-item, .team-card, .about-image, .mv-block');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => observer.observe(el));
});