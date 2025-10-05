const modal = document.getElementById("modal");
const addBtn = document.getElementById("addExerciseBtn");
const closeBtn = document.getElementById("cerrarBtn");
const saveBtn = document.getElementById("guardarBtn");
const list = document.getElementById("exerciseList");

addBtn.onclick = () => modal.style.display = "flex";
closeBtn.onclick = () => modal.style.display = "none";

saveBtn.onclick = () => {
  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const imagen = document.getElementById("imagen").value.trim();

  if (nombre && descripcion) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${imagen || '../../img/default-calistenia.jpg'}" alt="${nombre}">
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
    `;
    list.appendChild(card);
    modal.style.display = "none";

    // Limpiar campos
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("imagen").value = "";
  } else {
    alert("Por favor completa todos los campos.");
  }
};

// Cerrar modal al hacer clic fuera
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
