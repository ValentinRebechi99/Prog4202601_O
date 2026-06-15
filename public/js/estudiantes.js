let estudiantes = [];


const cargarEstudiantes = async () => {

    try {

        const respuesta = await fetch(
            "http://localhost:3000/estudiantes"
        );

        if (!respuesta.ok) {
            throw new Error();
        }

        estudiantes = await respuesta.json();

        console.log(estudiantes);

        mostrarEstudiantes(estudiantes);

    } catch (error) {

        console.error(error);

        document.getElementById("error").innerHTML =
            "Error al cargar los estudiantes";
    }
};

const mostrarEstudiantes = (datos) => {

    const tabla = document.getElementById("tbodyEstudiantes");

    tabla.innerHTML = "";

    datos.forEach(estudiante => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${estudiante.documento}</td>
            <td>${estudiante.apellido}</td>
            <td>${estudiante.nombres}</td>
            <td>${estudiante.email}</td>
            <td>${new Date(estudiante.fechaNacimiento).toLocaleDateString()}</td>
            <td>Sí</td>
            <td>
                <div class="boton-mod">
                    <a href="estudiantes-mod.html#${estudiante.idEstudiante}" class="btn btn-secondary">
                        +Modificar Estudiante
                    </a>

                    <button class="btn btn-danger btn-eliminar">
                        Eliminar Estudiante
                    </button>
                </div>
            </td>
        `;

        tabla.appendChild(fila);

        fila.querySelector(".btn-eliminar")
            .addEventListener("click", async () => {

                const confirmar = confirm(
                    "¿Desea eliminar este estudiante?"
                );

                if (!confirmar) return;

                try {

                    const respuesta = await fetch(
                        `http://localhost:3000/estudiantes/${estudiante.idEstudiante}`,
                        {
                            method: "DELETE"
                        }
                    );

                    if (!respuesta.ok) {
                        throw new Error();
                    }

                    alert("Estudiante eliminado");

                    fila.remove();

                } catch (error) {

                    console.error(error);

                    alert("Error al eliminar");
                }
            });
    });
};

document.addEventListener("DOMContentLoaded", cargarEstudiantes);