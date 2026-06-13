let cursos = [];

const cargarCursos = async () => {

    try {

        const respuesta = await fetch(
            "http://localhost:3000/cursos"
        );

        if (!respuesta.ok) {
            throw new Error();
        }

        cursos = await respuesta.json();

        mostrarCursos(cursos);

    } catch (error) {

        console.error(error);

        document.getElementById("error").innerHTML =
            "Error al cargar los cursos";
    }
};

const filtrarCursos = () => {

    const idBuscado =
        document.getElementById("buscarCurso")
            .value
            .trim();

    const estadoBuscado =
        document.getElementById("estado")
            .value;

    const filtrados = cursos.filter(curso => {

        const coincideId =
            idBuscado === "" ||
            curso.id_curso
                .toString()
                .includes(idBuscado);

        const coincideEstado =
            estadoBuscado === "" ||
            curso.estado === estadoBuscado;

        return coincideId && coincideEstado;
    });

    mostrarCursos(filtrados);
};




const mostrarCursos = (datos) => {

    const tabla = document.getElementById("tbody");

    tabla.innerHTML = "";

    datos.forEach(curso => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${curso.id_curso}</td>
            <td>${curso.nombre}</td>
            <td>${curso.descripcion}</td>
            <td>${new Date(curso.fecha_inicio).toLocaleDateString()}</td>
            <td>${curso.cantidad_horas}</td>
            <td>${curso.inscriptos_max}</td>
            <td>${curso.estado}</td>
            <td>
                <div class="boton-mod">
                    <a href="cursos-mod.html#${curso.id_curso}" class="btn btn-secondary">
                        +Modificar Curso
                    </a>

                    <button class="btn btn-danger btn-eliminar">
                        Eliminar Curso
                    </button>
                </div>
            </td>
        `;

        tabla.appendChild(fila);

        fila.querySelector(".btn-eliminar")
            .addEventListener("click", async () => {

                const confirmar = confirm(
                    "¿Desea eliminar este curso?"
                );

                if (!confirmar) return;

                try {

                    const respuesta = await fetch(
                        `http://localhost:3000/cursos/${curso.id_curso}`,
                        {
                            method: "DELETE"
                        }
                    );

                    if (!respuesta.ok) {
                        throw new Error();
                    }

                    alert("Curso eliminado");

                    fila.remove();

                } catch (error) {

                    console.error(error);

                    alert("Error al eliminar");
                }
            });
    });
};

document.addEventListener("DOMContentLoaded", () => {

    console.log("buscarCurso:", document.getElementById("buscarCurso"));
    console.log("estado:", document.getElementById("estado"));

    cargarCursos();

    const buscar = document.getElementById("buscarCurso");
    const estado = document.getElementById("estado");

    if (buscar) {
        buscar.addEventListener("input", filtrarCursos);
    }

    if (estado) {
        estado.addEventListener("change", filtrarCursos);
    }

});
