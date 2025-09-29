document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const user = usuarios.find(u => u.nombre === usuario && u.contrasena === contrasena);

  if (user) {
    // Guardar sesión
    localStorage.setItem("usuarioLogueado", JSON.stringify(user));

    // Redirigir según rol
    switch(user.rol) {
      case "administrador":
        window.location.href = "../principal/admin/Admin.html";
        break;
      case "entrenador":
        window.location.href = "../principal/entrenador/Entrenador.html";
        break;
      case "nutricionista":
        window.location.href = "../principal/nutricionista/Nutricionista.html";
        break;
      default:
        window.location.href = "../principal/usuario/Usuario.html";
    }
  } else {
    alert("Usuario o contraseña incorrectos ❌");
  }
});
