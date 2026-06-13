const cargarEstudiantes = async () => {
    try {
        const respuesta = await fetch("./estudiantes.json");
        const datos = await respuesta.json();

        const tabla = document.getElementById("tbodyEstudiantes");
        datos.forEach(estudiante => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
            <td>${estudiante.documento}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.apellido}</td>
            <td>${estudiante.email}</td>
            <td class="text-center">${new Date(estudiante.fechaNacimiento).toLocaleDateString()}</td>
            <td class="text-center">${estudiante.activo ? "Sí" : "No"}</td>`;
            tabla.appendChild(fila);
        });
        document.getElementById("error").style.display = "none";

    } catch (error) {
        document.getElementById("error").innerHTML = "<p>Error al cargar los estudiantes.</p>";
        document.getElementById("error").style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", cargarEstudiantes);