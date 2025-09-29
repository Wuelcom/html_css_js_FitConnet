// Verificamos si hay un usuario logueado
let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

if (!usuarioLogueado) {
  // Si no hay nadie logueado, redirige al login
  window.location.href = "../../login/login.html";
} else {
  // Si hay usuario pero NO es administrador, lo sacamos
  if (usuarioLogueado.rol !== "administrador") {
    alert("No tienes permisos para entrar aquí ❌");
    window.location.href = "../../login/login.html";
  } else {
    // Si es admin, mostramos su nombre en la bienvenida
    const bienvenida = document.getElementById("bienvenidaAdmin");
    if (bienvenida) {
      bienvenida.textContent = `Bienvenido Administrador: ${usuarioLogueado.nombre}`;
    }
  }
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "../../login/login.html";
}
