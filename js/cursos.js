const cargarCursos = async () => {

    try {
        const respuesta = await fetch("http://localhost:3000/cursos");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }

        const datos = await respuesta.json();

        const tabla = document.getElementById("tbody");

        datos.forEach(curso => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td id="elementos">${curso.id_curso}</td>
                <td id="elementos">${curso.nombre}</td>
                <td id="elementos">${curso.descripcion}</td>
                <td id="elementos">${new Date(curso.fecha_inicio).toLocaleDateString()}</td>
                <td id="elementos">${curso.cantidad_horas}</td>
                <td id="elementos">${curso.inscriptos_max}</td>
                <td id="elementos">${curso.estado}</td>
                <td id="elementos"> 
                    <div class="boton-mod">
                        <a href="cursos-mod.html#${curso.id_curso}" class="btn btn-secondary">+Modificar Curso</a>
                    </div>
                </td>

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



