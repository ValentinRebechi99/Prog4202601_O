const cargarCursos = async () => {

    try {

        const respuesta = await fetch("http://localhost:3000/cursos");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }

        const datos = await respuesta.json();

        console.log(datos);

        const tabla = document.getElementById("tbody");

        datos.forEach(curso => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${curso.id_curso}</td>
                <td>${curso.nombre}</td>
                <td>${curso.descripcion}</td>
                <td>${new Date(curso.fecha_inicio).toLocaleDateString()}</td>
                <td>${curso.cantidad_horas}</td>
                <td>${curso.inscriptos_max}</td>
                <td>${curso.id_curso_estado}</td>

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