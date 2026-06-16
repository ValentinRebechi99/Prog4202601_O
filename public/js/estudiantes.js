let estudiantes = [];

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
    if (document.getElementById("buscardni").value.trim() == "") {
        cargarEstudiantes();
    } else {
        filtrarEstudiantes();
    }
});

ButtonNext.addEventListener("click", async (evt) => {
    pagina = pagina + 1;
    document.getElementById("NumberPage").textContent = pagina + 1;
    if (document.getElementById("buscardni").value.trim() == "") {
        cargarEstudiantes();
    } else {
        filtrarEstudiantes();
    }
});

const cargarEstudiantes = async () => {

    try {

        const respuesta = await fetch(
            `http://localhost:3000/estudiantes?limit=${limit}&offset=${pagina*limit}`
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

// el uso de esta funcion es para arreglar un problema de paginacion
const pipeFiltrar = async () => {
    pagina = 0;
    document.getElementById("NumberPage").textContent = pagina + 1;
    filtrarEstudiantes();
}

const filtrarEstudiantes = async () => {

    try {

        const dniBuscado =
            document.getElementById("buscardni").value.trim();

        const params = new URLSearchParams();

        if (dniBuscado) {
            params.append("documento", dniBuscado);
        }
        params.append("limit", limit);
        params.append("offset", (pagina * limit));
        const respuesta = await fetch(
            `http://localhost:3000/estudiantes?${params.toString()}`
        );

        if (!respuesta.ok) {
            throw new Error();
        }

        const datos = await respuesta.json();

        console.log(datos);

        mostrarEstudiantes(datos);

    } catch (error) {

        console.error(error);

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

document.addEventListener("DOMContentLoaded", () => {

    cargarEstudiantes();

    document.getElementById("btnBuscar")
        .addEventListener("click", pipeFiltrar);

});