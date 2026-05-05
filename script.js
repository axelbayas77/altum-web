// MENÚ (ya lo tienes pero lo dejamos aquí completo)
const btnMenu = document.getElementById("btnMenu");
const enlaces = document.querySelector(".enlaces");

btnMenu.addEventListener("click", () => {
  enlaces.classList.toggle("activo");
});


// ANIMACIONES AL HACER SCROLL
const elementosAnimados = document.querySelectorAll(".animado");

function mostrarAnimaciones() {
  elementosAnimados.forEach((elemento) => {
    const posicion = elemento.getBoundingClientRect().top;
    const alturaPantalla = window.innerHeight;

    if (posicion < alturaPantalla - 100) {
      elemento.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", mostrarAnimaciones);
mostrarAnimaciones();

// NAVBAR CAMBIA AL HACER SCROLL
const encabezado = document.querySelector(".encabezado");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    encabezado.classList.add("scrolled");
  } else {
    encabezado.classList.remove("scrolled");
  }
});

// CERRAR MENÚ AL HACER CLICK
const links = document.querySelectorAll(".enlaces a");

links.forEach(link => {
  link.addEventListener("click", () => {
    enlaces.classList.remove("activo");
  });
});

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

  btnSiguiente.addEventListener("click", () => {
    mostrarSlide(indice + 1);
  });

  btnAnterior.addEventListener("click", () => {
    mostrarSlide(indice - 1);
  });
});

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const imgLightbox = document.getElementById("imgLightbox");
const cerrar = document.querySelector(".cerrar");

document.querySelectorAll(".proyecto").forEach((proyecto) => {
  proyecto.addEventListener("click", (e) => {

    // Evita que las flechas abran el lightbox
    if (e.target.classList.contains("flecha")) return;

    let imagen = "";

    const slideActivo = proyecto.querySelector(".slide.activo");

    if (slideActivo) {
      imagen = slideActivo.style.backgroundImage;
      imagen = imagen.replace('url("', '').replace('")', '');
    } else {
      imagen = proyecto.style.backgroundImage;
      imagen = imagen.replace('url("', '').replace('")', '');
    }

    imgLightbox.src = imagen;
    lightbox.classList.add("activo");
  });
});

cerrar.addEventListener("click", () => {
  lightbox.classList.remove("activo");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("activo");
  }
});

// SWIPE para carrusel
document.querySelectorAll(".carrusel-proyecto").forEach(carrusel => {

  let startX = 0;
  let endX = 0;

  carrusel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  carrusel.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;

    if (startX > endX + 50) {
      // swipe izquierda → siguiente
      carrusel.querySelector(".flecha.siguiente").click();
    }

    if (startX < endX - 50) {
      // swipe derecha → anterior
      carrusel.querySelector(".flecha.anterior").click();
    }
  });

});

// AUTOPLAY carrusel
document.querySelectorAll(".carrusel-proyecto").forEach(carrusel => {

  let intervalo = setInterval(() => {
    carrusel.querySelector(".flecha.siguiente").click();
  }, 4000); // cambia cada 4 segundos

  // pausa cuando el mouse está encima
  carrusel.addEventListener("mouseenter", () => {
    clearInterval(intervalo);
  });

  // reanuda cuando el mouse sale
  carrusel.addEventListener("mouseleave", () => {
    intervalo = setInterval(() => {
      carrusel.querySelector(".flecha.siguiente").click();
    }, 4000);
  });

});

// FORMULARIO A WHATSAPP
const formularioContacto = document.getElementById("formularioContacto");

formularioContacto.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje").value;

  const texto = `Hola, soy ${nombre}. Mi correo es ${correo}. Quiero información sobre: ${mensaje}`;
  const numero = "593996241342";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");
});

// MENÚ ACTIVO (VERSIÓN SEGURA)
document.addEventListener("DOMContentLoaded", () => {

  const secciones = document.querySelectorAll("section");
  const links = document.querySelectorAll(".enlaces a");

  window.addEventListener("scroll", () => {
    let current = "";

    secciones.forEach((section) => {
      const sectionTop = section.offsetTop - 120;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    links.forEach((a) => {
      a.classList.remove("activo");

      if (a.getAttribute("href") === "#" + current) {
        a.classList.add("activo");
      }
    });
  });

});