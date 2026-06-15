const cargarEstudiante = async () => {

    const estudianteId = window.location.hash.substring(1);

    try {

        const respuesta = await fetch(
            `http://localhost:3000/estudiantes?idEstudiante=${estudianteId}`
        );

        if (!respuesta.ok) {
            throw new Error("Error al cargar estudiante");
        }

        const datos = await respuesta.json();

        const estudiante = datos[0];

        document.getElementById("documento").value =
            estudiante.documento;

        document.getElementById("nombre").value =
            estudiante.nombres;

        document.getElementById("apellido").value =
            estudiante.apellido;

        document.getElementById("email").value =
            estudiante.email;

        document.getElementById("fecnac").value =
            estudiante.fechaNacimiento.split("T")[0];

        document.getElementById("activo").value =
            estudiante.activo ? "true" : "false";

        document.getElementById("ErrorServer")
            .classList.add("d-none");

    } catch (error) {

        console.error(error);

        document.getElementById("ErrorServer").textContent =
            "Error al cargar los datos del estudiante";

        document.getElementById("ErrorServer")
            .classList.remove("d-none");
    }
};


const iniciar = () => {

    const envio =
        document.getElementById("btnGuardarEstudiante");

    envio.addEventListener("click", async (evt) => {

        evt.preventDefault();

        const estudianteId =
            window.location.hash.substring(1);

        const obj = {

            documento:
                document.getElementById("documento").value,

            apellido:
                document.getElementById("apellido").value,

            nombres:
                document.getElementById("nombre").value,

            email:
                document.getElementById("email").value,

            fechaNacimiento:
                document.getElementById("fecnac").value,

            activo:
                document.getElementById("activo").value === "true" ? 1 : 0
        };

        try {

            const respuesta = await fetch(
                `http://localhost:3000/estudiantes/${estudianteId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)
                }
            );

            if (!respuesta.ok) {

                const errorBody = await respuesta.json();

                console.log(errorBody);

                throw new Error(
                    `Response ${respuesta.status}`
                );
            }

            alert(
                "Estudiante actualizado correctamente"
            );

            window.location.href =
                "estudiantes.html";

        } catch (error) {

            console.error(error);

            document.getElementById("ErrorServer")
                .classList.remove("d-none");
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {

    cargarEstudiante();
    iniciar();

});