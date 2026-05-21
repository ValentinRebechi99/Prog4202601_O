const cargarCurso = async () => {

    const cursoId =
        window.location.hash.substring(1);

    try {

        const respuesta = await fetch(
            `http://localhost:3000/cursos/${cursoId}`
        );

        if (!respuesta.ok) {
            throw new Error("Error al cargar curso");
        }

        const datos = await respuesta.json();

        const curso = datos[0];

        console.log(curso);

        // Completar inputs
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

         switch (curso.estado) {

            case "BORRADOR":
                document.getElementById("estado").value = "1";
                break;

            case "INSCRIPCIÓN ABIERTA":
                document.getElementById("estado").value = "2";
                break;
            case "INSCRIPCIÓN CERRADA":
                document.getElementById("estado").value = "3";
                break;

            case "ELIMINADO":
                document.getElementById("estado").value = "4";
                break;
        }


    } catch (error) {

        console.error(error);

        alert("Error al cargar curso");
    }
};

const iniciar = () => {

    const envio = document.getElementById("btnGuardarCurso");

    envio.addEventListener("click", async (evt) => {

        evt.preventDefault();
        evt.stopPropagation();

        // Obtener ID desde el #
        const cursoId = window.location.hash.substring(1);

        const obj = {

            nombre: document.getElementById("nombre").value,

            descripcion:
                document.getElementById("descripcion").value,

            fecha_inicio:
                document.getElementById("fechaInicio").value,

            cantidad_horas: parseInt(
                document.getElementById("cantidadHoras").value
            ),

            inscriptos_maximos: parseInt(
                document.getElementById("cantidadInscriptos").value
            ),
            id_curso_estado: parseInt(
                    document.getElementById("estado").value
                )
        };

        console.log("ID:", cursoId);
        console.log(obj);

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
                throw new Error("Error al actualizar");
            }

            const datos = await respuesta.json();

            console.log(datos);

            alert("Curso actualizado correctamente");

            window.location.href =
                "http://localhost:3000/cursos.html";

        } catch (error) {

            console.error(error);

            alert("Error al actualizar curso");
        }

    });

};

document.addEventListener("DOMContentLoaded", () => {cargarCurso();iniciar();

});