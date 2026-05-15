const cargarEstudiantes = async () => {
    try {
        const respuesta = await fetch("js/estudiantes.json");
        const datos = await respuesta.json();

        const tabla = document.getElementById("tbody");
        datos.forEach(estudiante => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
            <td>${estudiante.idEstudiante}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.descripcion}</td>
            <td class="text-center">${new Date(estudiante.fechaInicio).toLocaleDateString()}</td>
            <td class="text-center">${estudiante.cantidadHoras}</td>
            <td class="text-center">${estudiante.inscriptosMax}</td>
            <td class="text-center">${estudiante.estado}</td>`;
            tabla.appendChild(fila);
        });
        document.getElementById("error").style.display = "none";

    } catch (error) {
        document.getElementById("error").innerHTML = "<p>Error al cargar los estudiantes.</p>";
        document.getElementById("error").style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", cargarEstudiantes);