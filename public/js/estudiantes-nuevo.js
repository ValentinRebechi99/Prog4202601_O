const iniciar = () => {

    const envio = document.getElementById("btnGuardarEstudiante");

    envio.addEventListener("click", async (evt) => {

        evt.preventDefault();
        evt.stopPropagation();

        const obj = {
            documento: document.getElementById("documento").value,
            apellido: document.getElementById("apellido").value,
            nombres: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            fechaNacimiento: document.getElementById("fecnac").value,
            activo: document.getElementById("activo").value === "true" ? 1 : 0

        };
        console.log(obj);
        document.getElementById("ErrorServer")
            .classList.add("d-none");

        try {

            const respuesta = await fetch(
                "http://localhost:3000/estudiantes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)
                }
            );

            if (!respuesta.ok) {

                const errorBody = await respuesta.json();

                alert(JSON.stringify(errorBody.errors, null, 2));

                throw new Error(`Response ${respuesta.status}`);
            }

            const datos = await respuesta.json();

        

            alert("Estudiante guardado correctamente");

            window.location.href =
                "http://localhost:3000/estudiantes.html";

        } catch (error) {

            console.error(error);

            document.getElementById("ErrorServer")
                .classList.remove("d-none");
        }

    });
};

document.addEventListener("DOMContentLoaded", iniciar);