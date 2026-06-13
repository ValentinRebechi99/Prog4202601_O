const cargarCurso = async () => {

    const cursoId = window.location.hash.substring(1);

    try {

        const respuesta = await fetch(
            `http://localhost:3000/cursos/${cursoId}`
        );

        if (!respuesta.ok) {
            throw new Error("Error al cargar curso");
        }

        const datos = await respuesta.json();
        const curso = datos[0];

        document.getElementById("nombre").value =
            curso.nombre;

        document.getElementById("descripcion").value =
            curso.descripcion;

        document.getElementById("fechaInicio").value =
            curso.fechaInicio.split("T")[0];

        document.getElementById("cantidadHoras").value =
            curso.cantidadHoras;

        document.getElementById("cantidadInscriptos").value =
            curso.inscriptosMax;

        document.getElementById("estado").value =
            curso.estado;

    } catch (error) {

        console.error(error);
        alert("Error al cargar curso");
    }
};

const iniciar = () => {

    const envio =
        document.getElementById("btnGuardarCurso");

    envio.addEventListener("click", async (evt) => {

        evt.preventDefault();

        const cursoId =
            window.location.hash.substring(1);

        const obj = {

            nombre:
                document.getElementById("nombre").value,

            descripcion:
                document.getElementById("descripcion").value,

            fechaInicio:
                document.getElementById("fechaInicio").value,

            cantidadHoras:
                parseInt(document.getElementById("cantidadHoras").value),

            inscriptosMaximos:
                parseInt(document.getElementById("cantidadInscriptos").value),

            idCursoEstado:
                parseInt(document.getElementById("estado").value),
            
        };

        try {

            const respuesta = await fetch(
                `http://localhost:3000/cursos/${cursoId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)
                }
            );

            if (!respuesta.ok) {
                throw new Error();
            }

            alert("Curso actualizado correctamente");

            window.location.href = "cursos.html";

        } catch (error) {

            console.error(error);
            alert("Error al actualizar curso");
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {

    cargarCurso();
    iniciar();

});