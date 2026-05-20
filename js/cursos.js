const cargarCursos = async () => {

    try {

        const respuesta = await fetch("./js/cursos.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }

        const datos = await respuesta.json();

        console.log(datos);

        const tabla = document.getElementById("tbody");

        datos.forEach(curso => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${curso.idCurso}</td>
                <td>${curso.nombre}</td>
                <td>${curso.descripcion}</td>
                <td>${new Date(curso.fechaInicio).toLocaleDateString()}</td>
                <td>${curso.cantidadHoras}</td>
                <td>${curso.inscriptosMax}</td>
                <td>${curso.estado}</td>
            `;

            tabla.appendChild(fila);

        });

    } catch (error) {

        console.error(error);

        document.getElementById("error").innerHTML =
            "Error al cargar los cursos";

    }

};

document.addEventListener("DOMContentLoaded", cargarCursos);