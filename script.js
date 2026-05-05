document.addEventListener("DOMContentLoaded", () => {

  // MENÚ RESPONSIVE
  const btnMenu = document.getElementById("btnMenu");
  const enlaces = document.querySelector(".enlaces");

  if (btnMenu && enlaces) {
    btnMenu.addEventListener("click", () => {
      enlaces.classList.toggle("activo");
    });

    document.querySelectorAll(".enlaces a").forEach(link => {
      link.addEventListener("click", () => {
        enlaces.classList.remove("activo");
      });
    });
  }

  // ANIMACIONES
const elementosAnimados = document.querySelectorAll(".animado, .animado-left, .animado-right");
  function activarAnimaciones() {
    elementosAnimados.forEach((elemento) => {
      const posicion = elemento.getBoundingClientRect().top;
      const altoPantalla = window.innerHeight;

      if (posicion < altoPantalla - 100) {
        elemento.classList.add("visible");
      }
    });
  }

  activarAnimaciones();
  window.addEventListener("scroll", activarAnimaciones);

  // NAVBAR AL HACER SCROLL
  const encabezado = document.querySelector(".encabezado");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      encabezado.classList.add("scrolled");
    } else {
      encabezado.classList.remove("scrolled");
    }
  });

  // CARRUSELES
  const carruseles = document.querySelectorAll(".carrusel-proyecto");

  carruseles.forEach((carrusel) => {
    const slides = carrusel.querySelectorAll(".slide");
    const btnAnterior = carrusel.querySelector(".anterior");
    const btnSiguiente = carrusel.querySelector(".siguiente");
    let indice = 0;

    function mostrarSlide(nuevoIndice) {
      slides[indice].classList.remove("activo");
      indice = (nuevoIndice + slides.length) % slides.length;
      slides[indice].classList.add("activo");
    }

    btnSiguiente.addEventListener("click", (e) => {
      e.stopPropagation();
      mostrarSlide(indice + 1);
    });

    btnAnterior.addEventListener("click", (e) => {
      e.stopPropagation();
      mostrarSlide(indice - 1);
    });

    // AUTOPLAY
    let intervalo = setInterval(() => {
      mostrarSlide(indice + 1);
    }, 4000);

    carrusel.addEventListener("mouseenter", () => {
      clearInterval(intervalo);
    });

    carrusel.addEventListener("mouseleave", () => {
      intervalo = setInterval(() => {
        mostrarSlide(indice + 1);
      }, 4000);
    });

    // SWIPE
    let startX = 0;

    carrusel.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    carrusel.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;

      if (startX > endX + 50) {
        mostrarSlide(indice + 1);
      }

      if (startX < endX - 50) {
        mostrarSlide(indice - 1);
      }
    });
  });

  // LIGHTBOX
  const lightbox = document.getElementById("lightbox");
  const imgLightbox = document.getElementById("imgLightbox");
  const cerrar = document.querySelector(".cerrar");

  document.querySelectorAll(".proyecto").forEach((proyecto) => {
    proyecto.addEventListener("click", () => {
      let imagen = "";
      const slideActivo = proyecto.querySelector(".slide.activo");

      if (slideActivo) {
        imagen = slideActivo.style.backgroundImage;
      } else {
        imagen = proyecto.style.backgroundImage;
      }

      imagen = imagen.replace('url("', '').replace('")', '');

      if (imagen) {
        imgLightbox.src = imagen;
        lightbox.classList.add("activo");
      }
    });
  });

  if (cerrar) {
    cerrar.addEventListener("click", () => {
      lightbox.classList.remove("activo");
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("activo");
      }
    });
  }

  // FORMULARIO A WHATSAPP
  const formularioContacto = document.getElementById("formularioContacto");

  if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const correo = document.getElementById("correo").value;
      const mensaje = document.getElementById("mensaje").value;

      const texto = `Hola, soy ${nombre}. Mi correo es ${correo}. Quiero información sobre: ${mensaje}`;
      const numero = "593988955354";
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

      window.open(url, "_blank");
    });
  }

});

// OCULTAR LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "0.5s";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1200); // tiempo que se ve el loader
});

// BOTÓN VOLVER ARRIBA
const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
});

btnTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});