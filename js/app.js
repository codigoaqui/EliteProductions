// Scroll suave para los enlaces del menú
const menuLinks = document.querySelectorAll('.navbar a');
menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Validación básica del formulario de contacto
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formMsg.textContent = '¡Gracias por tu mensaje! Pronto te contactaremos.';
    form.reset();
  });
}

// Funcionalidad del modal de la galería
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
const galleryImages = document.querySelectorAll('.galeria-grid img');
let currentImageIndex = 0;

function openModal(img) {
  modal.style.display = "flex";
  modalImg.src = img.src;
  document.body.style.overflow = 'hidden';
  
  // Encontrar el índice de la imagen actual
  currentImageIndex = Array.from(galleryImages).indexOf(img);
  updateNavigationButtons();
  
  // Activar la transición
  setTimeout(() => {
    modalImg.classList.add('active');
  }, 50);
}

function updateNavigationButtons() {
  prevArrow.style.display = currentImageIndex > 0 ? 'flex' : 'none';
  nextArrow.style.display = currentImageIndex < galleryImages.length - 1 ? 'flex' : 'none';
}

function showNextImage() {
  if (currentImageIndex < galleryImages.length - 1) {
    modalImg.classList.remove('active');
    setTimeout(() => {
      currentImageIndex++;
      modalImg.src = galleryImages[currentImageIndex].src;
      updateNavigationButtons();
      setTimeout(() => {
        modalImg.classList.add('active');
      }, 50);
    }, 300);
  }
}

function showPrevImage() {
  if (currentImageIndex > 0) {
    modalImg.classList.remove('active');
    setTimeout(() => {
      currentImageIndex--;
      modalImg.src = galleryImages[currentImageIndex].src;
      updateNavigationButtons();
      setTimeout(() => {
        modalImg.classList.add('active');
      }, 50);
    }, 300);
  }
}

// Event listeners para las flechas
prevArrow.addEventListener('click', showPrevImage);
nextArrow.addEventListener('click', showNextImage);

// Navegación con teclado
document.addEventListener('keydown', function(e) {
  if (modal.style.display === "flex") {
    if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'Escape') {
      modal.style.display = "none";
      document.body.style.overflow = 'auto';
    }
  }
});

// Cerrar modal al hacer clic en la X
closeModal.onclick = function() {
  modalImg.classList.remove('active');
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
  }, 300);
}

// Cerrar modal al hacer clic fuera de la imagen
modal.addEventListener('click', function(e) {
  if (e.target === modal || e.target === closeModal) {
    modalImg.classList.remove('active');
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = 'auto';
    }, 300);
  }
});

// Prevenir que los clics en la imagen cierren el modal
modalImg.addEventListener('click', function(e) {
  e.stopPropagation();
});

// Prevenir que los clics en las flechas cierren el modal
prevArrow.addEventListener('click', function(e) {
  e.stopPropagation();
});

nextArrow.addEventListener('click', function(e) {
  e.stopPropagation();
});

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Botón de ir arriba
document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopButton = document.getElementById('scrollToTop');

  // Mostrar/ocultar el botón
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.classList.add('visible');
    } else {
      scrollToTopButton.classList.remove('visible');
    }
  });

  // Función para ir arriba
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Asegurar que la página comience desde el inicio
document.addEventListener('DOMContentLoaded', function() {
  // Si hay un hash en la URL, removerlo
  if (window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname);
  }
  
  // Ir al inicio de la página con scroll suave
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      duration: 1000
    });
  }, 100);

  // Manejar el botón de contacto en el hero
  const contactButton = document.querySelector('.hero .btn');
  if (contactButton) {
    contactButton.addEventListener('click', function(e) {
      e.preventDefault();
      const contactSection = document.querySelector('#contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Remover el hash de la URL después de hacer scroll
        setTimeout(() => {
          window.history.replaceState(null, null, window.location.pathname);
        }, 1000);
      }
    });
  }
}); 