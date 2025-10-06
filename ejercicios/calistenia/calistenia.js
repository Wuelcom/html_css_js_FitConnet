// ================================
// Calistenia.js — FitConnet
// ================================

// Elementos del DOM
const form = document.getElementById("formCalistenia");
const contenedor = document.getElementById("contenedorEjercicios");

// Cargar ejercicios desde LocalStorage al iniciar
document.addEventListener("DOMContentLoaded", mostrarEjercicios);

// Escuchar el envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const grupo = document.getElementById("grupo").value.trim();
  const series = document.getElementById("series").value.trim();
  const repeticiones = document.getElementById("repeticiones").value.trim();
  const imagen = document.getElementById("imagen").value.trim();

  if (!nombre || !grupo || !series || !repeticiones) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  const nuevoEjercicio = {
    nombre,
    grupo,
    series,
    repeticiones,
    imagen: imagen || "https://cdn.pixabay.com/photo/2016/03/27/19/31/man-1282232_1280.jpg"
  };

  guardarEjercicio(nuevoEjercicio);
  form.reset();
  mostrarEjercicios();
});

// ================================
// Funciones
// ================================

// Guardar en LocalStorage
function guardarEjercicio(ejercicio) {
  let ejercicios = JSON.parse(localStorage.getItem("ejerciciosCalistenia")) || [];
  ejercicios.push(ejercicio);
  localStorage.setItem("ejerciciosCalistenia", JSON.stringify(ejercicios));
}

// Mostrar todos los ejercicios guardados
function mostrarEjercicios() {
  const ejercicios = JSON.parse(localStorage.getItem("ejerciciosCalistenia")) || [];
  
  // Limpiar contenedor
  contenedor.innerHTML = "";

  // Agregar ejercicios predefinidos
  const predefinidos = [
    {
      nombre: "Flexiones",
      grupo: "Pecho, hombros y tríceps",
      series: 3,
      repeticiones: 15,
      imagen: "https://cdn.pixabay.com/photo/2016/03/27/19/31/man-1282232_1280.jpg"
    },
    {
      nombre: "Dominadas",
      grupo: "Espalda y bíceps",
      series: 3,
      repeticiones: 10,
      imagen: "https://cdn.pixabay.com/photo/2016/11/19/14/00/fitness-1835736_1280.jpg"
    }
  ];

  const todos = [...predefinidos, ...ejercicios];

  todos.forEach(ejercicio => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `
      <img src="${ejercicio.imagen}" alt="${ejercicio.nombre}">
      <h3>${ejercicio.nombre}</h3>
      <p><strong>Grupo:</strong> ${ejercicio.grupo}</p>
      <p><strong>Series:</strong> ${ejercicio.series} | <strong>Reps:</strong> ${ejercicio.repeticiones}</p>
    `;
    contenedor.appendChild(tarjeta);
  });
}
