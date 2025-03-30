document.addEventListener("DOMContentLoaded", () => {
    cargarTareas();
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  });
  
  function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = "";
  
    tareas.forEach((tarea) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span style="text-decoration: ${tarea.completada ? 'line-through' : 'none'}">
          ${tarea.texto}
        </span>
        <button onclick="cambiarEstado(${tarea.id})">✔</button>
        <button onclick="eliminarTarea(${tarea.id})">❌</button>
      `;
      listaTareas.appendChild(li);
    });
  }
  
  function agregarTarea() {
    const input = document.getElementById("nuevaTarea");
    const texto = input.value.trim();
    if (texto) {
      const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
      tareas.push({ id: Date.now(), texto, completada: false });
      localStorage.setItem("tareas", JSON.stringify(tareas));
      input.value = "";
      cargarTareas();
      enviarNotificacion("Nueva tarea agregada");
    }
  }
  
  function eliminarTarea(id) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas = tareas.filter((tarea) => tarea.id !== id);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    cargarTareas();
    enviarNotificacion("Tarea eliminada");
  }
  
  function cambiarEstado(id) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    localStorage.setItem("tareas", JSON.stringify(tareas));
    cargarTareas();
    enviarNotificacion("Estado de la tarea actualizado");
  }
  
  function enviarNotificacion(mensaje) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("PWA Lista de Tareas", { body: mensaje, icon: "/public/icons/icon-192x192.png" });
    }
  }
  