let cursos = [];

var pagina = 0;
const limit = 4;
document.getElementById("NumberPage").textContent = pagina + 1;
const ButtonBack = document.getElementById("ButtonBack");
const ButtonNext = document.getElementById("ButtonNext");

ButtonBack.addEventListener("click", async (evt) => {
    if (pagina != 0) {
        pagina = pagina - 1;
    }
    document.getElementById("NumberPage").textContent = pagina + 1;
    if (document.getElementById("buscarCurso").value.trim() == "" & document.getElementById("buscarCurso").value.trim() == "") {
        cargarCursos();
    } else {
        filtrarCursos();
    }
});

ButtonNext.addEventListener("click", async (evt) => {
    pagina = pagina + 1;
    document.getElementById("NumberPage").textContent = pagina + 1;
    if (document.getElementById("buscarCurso").value.trim() == "" & document.getElementById("buscarCurso").value.trim() == "") {
        cargarCursos();
    } else {
        filtrarCursos();
    }
});

const cargarCursos = async () => {

    try {
        const respuesta = await fetch(
            `http://localhost:3000/cursos?limit=${limit}&offset=${pagina*limit}`
        );

        if (!respuesta.ok) {
            throw new Error();
        }

        cursos = await respuesta.json();
        console.log(cursos);
        mostrarCursos(cursos);

    } catch (error) {

        console.error(error);

        document.getElementById("error").innerHTML =
            "Error al cargar los cursos";
    }
};

// el uso de esta funcion es para arreglar un problema de paginacion
const pipeFiltrar = async () => {
    pagina = 0;
    document.getElementById("NumberPage").textContent = pagina + 1;
    filtrarCursos();
}

const filtrarCursos = async () => {
    try {
        const idBuscado =
            document.getElementById("buscarCurso").value.trim();

        const nombreBuscado =
            document.getElementById("buscarNombre").value.trim();

        const estadoBuscado =
            document.getElementById("estado").value;

        const params = new URLSearchParams();

        if (idBuscado)
            params.append("idCurso", idBuscado);

        if (nombreBuscado)
            params.append("nombre", nombreBuscado);

        if (estadoBuscado)
            params.append("idCursoEstado", estadoBuscado);
        params.append("limit", limit);
        params.append("offset", (pagina * limit));
        console.log(params.toString());
        const respuesta = await fetch(
            `http://localhost:3000/cursos?${params.toString()}`
        );

        if (!respuesta.ok) {
            throw new Error();
        }

        const datos = await respuesta.json();
        console.log(datos);
        console.log(datos[0]);
        mostrarCursos(datos);

    } catch (error) {

        console.error(error);

    }
};




const mostrarCursos = (datos) => {

    const tabla = document.getElementById("tbody");

    tabla.innerHTML = "";

    datos.forEach(curso => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${curso.idCurso}</td>
            <td>${curso.nombre}</td>
            <td>${curso.descripcion}</td>
            <td>${new Date(curso.fechaInicio).toLocaleDateString()}</td>
            <td>${curso.cantidadHoras}</td>
            <td>${curso.inscriptos}/${curso.inscriptosMax}</td>
            <td>${curso.estado}</td>
            <td>
                <div class="boton-mod">
                    <a href="cursos-mod.html#${curso.idCurso}" class="btn btn-secondary">
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
                    "Â¿Desea eliminar este curso?"
                );

                if (!confirmar) return;

                try {

                    const respuesta = await fetch(
                        `http://localhost:3000/cursos/${curso.idCurso}`,
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



                    alert("Error al eliminar");
                }
            });
    });
};

document.addEventListener("DOMContentLoaded", () => {

    cargarCursos();

    const buscar = document.getElementById("buscarCurso");
    const estado = document.getElementById("estado");

    document.getElementById("btnBuscar")
        .addEventListener("click", pipeFiltrar);

});
