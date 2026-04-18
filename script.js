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
    "clients_transformation/467280857_18252313954278553_5524067425918791421_n.jpg",
    "clients_transformation/467906908_18252313525278553_1019929937419045446_n.jpg",
    "clients_transformation/468184008_18252676915278553_2432480942652445263_n.jpg",
    "clients_transformation/468298476_18252677386278553_6827129010600524136_n.jpg",
    "clients_transformation/468610283_18253112470278553_7270588592594574775_n.jpg",
    "clients_transformation/468789156_18253112416278553_6912108494378747854_n.jpg",
    "clients_transformation/620978306_18304232791278553_5452683520020795773_n.jpg",
    "clients_transformation/623549317_18094089911301958_926039516781496309_n.webp",
    "clients_transformation/654444375_17994823859922235_3344556088925865332_n.webp"
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
  // const contactForm = document.getElementById('contactForm');
  // if (contactForm) {
  //   contactForm.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const name = document.getElementById('name')?.value.trim();
  //     const email = document.getElementById('email')?.value.trim();
  //     const message = document.getElementById('message')?.value.trim();
  //     const feedback = document.getElementById('formFeedback');
      
  //     if (!name || !email || !message) {
  //       if (feedback) {
  //         feedback.textContent = '❌ Please fill all required fields.';
  //         feedback.style.color = '#b1624b';
  //       }
  //       return;
  //     }
      
  //     if (!email.includes('@') || !email.includes('.')) {
  //       if (feedback) {
  //         feedback.textContent = '❌ Please enter a valid email address.';
  //         feedback.style.color = '#b1624b';
  //       }
  //       return;
  //     }
      
  //     if (feedback) {
  //       feedback.textContent = `✨ Thank you ${name}! We'll contact you soon. ✨`;
  //       feedback.style.color = '#6f8f6b';
  //     }
  //     contactForm.reset();
      
  //     setTimeout(() => {
  //       if (feedback) feedback.textContent = '';
  //     }, 4000);
  //   });
  // }
  
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

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Form se values le lo
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var message = document.getElementById('message').value;
  
  // WhatsApp number (Indian number - 9716888850)
  var whatsappNumber = '919716888850';  // Country code 91 ke saath
  
  // Message format karo
  var whatsappMessage = `*New Enquiry from Khushi Makeover Website*%0A%0A
*Name:* ${name}%0A
*Email:* ${email}%0A
*Phone:* ${phone}%0A
*Message:* ${message}%0A%0A
_This message was sent from website contact form_`;
  
  // WhatsApp link banao
  var whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  
  // Naya tab mein WhatsApp kholo
  window.open(whatsappURL, '_blank');
  
  // Feedback dikhao
  var feedback = document.getElementById('formFeedback');
  feedback.innerHTML = '✨ Redirecting to WhatsApp... Please send the message ✨';
  feedback.style.color = '#d9b8a4';
  
  // Form reset karo
  setTimeout(function() {
    document.getElementById('contactForm').reset();
    feedback.innerHTML = '';
  }, 3000);
});