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
            curso.fecha_inicio.split("T")[0];

        document.getElementById("cantidadHoras").value =
            curso.cantidad_horas;

        document.getElementById("cantidadInscriptos").value =
            curso.inscriptos_max;

        document.getElementById("estado").value =
            curso.id_curso_estado;

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

            fecha_inicio:
                document.getElementById("fechaInicio").value,

            cantidad_horas:
                parseInt(document.getElementById("cantidadHoras").value),

            inscriptos_maximos:
                parseInt(document.getElementById("cantidadInscriptos").value),

            id_curso_estado:
                parseInt(document.getElementById("estado").value)
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