document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav');

  if (menuToggle && navMenu) {
    // Toggle de clase para mostrar/ocultar el menú
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
    

    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  }

  // Desplazamiento suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 70; // Ajusta esto según la altura de tu encabezado
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Cambiar estilo del encabezado al hacer scroll
  window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(23, 23, 23, 0.9)';
      header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
      header.style.backgroundColor = '#171717';
      header.style.boxShadow = 'none';
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const barras = document.querySelectorAll(".barra-progreso");

  const activarBarras = () => {
      barras.forEach(barra => {
          const porcentaje = barra.getAttribute("data-porcentaje");
          barra.style.width = `${porcentaje}%`;
      });
  };

  const opcionesObserver = {
      threshold: 0.5, // Se activa cuando al menos el 50% de la sección es visible
  };

  const observer = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
          if (entrada.isIntersecting) {
              activarBarras();
              observer.disconnect(); // Desconectar una vez que se haya activado
          }
      });
  }, opcionesObserver);

  const habilidadesSeccion = document.querySelector("#habilidades");
  observer.observe(habilidadesSeccion);
});
