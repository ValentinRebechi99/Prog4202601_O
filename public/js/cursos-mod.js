const cargarCurso = async () => {

    const cursoId = window.location.hash.substring(1);

    try {

        const respuesta = await fetch(
            `http://localhost:3000/cursos/?idCurso=${cursoId}`
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

        switch(curso.estado){
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
        
        document.getElementById("nombre").classList.remove('is-invalid');
        document.getElementById("descripcion").classList.remove('is-invalid');
        document.getElementById("fechaInicio").classList.remove('is-invalid');
        document.getElementById("cantidadHoras").classList.remove('is-invalid');
        document.getElementById("cantidadInscriptos").classList.remove('is-invalid');
        document.getElementById("estado").classList.remove('is-invalid');
        document.getElementById("ErrorServer").classList.add('d-none');
        
    } catch (error) {
        console.error(error);
        document.getElementById("ErrorServer").textContent = "Error al cargar los datos del curso";
        document.getElementById("ErrorServer").classList.remove('d-none');
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
                const errorBody = await respuesta.json();
                if (respuesta.status == 400){
                    for (const errorRes of errorBody.errors){
                        switch(errorRes.path){
                            case "nombre":
                                document.getElementById("nombre").classList.add('is-invalid');
                                break;
                            case "descripcion":
                                document.getElementById("descripcion").classList.add('is-invalid');
                                break;
                            case "fechaInicio":
                                document.getElementById("fechaInicio").classList.add('is-invalid');
                                break;
                            case "cantidadHoras":
                                document.getElementById("cantidadHoras").classList.add('is-invalid');
                                break;
                            case "inscriptosMaximos":
                                document.getElementById("cantidadInscriptos").classList.add('is-invalid');
                                break;
                            case "idCursoEstado":
                                document.getElementById("estado").classList.add('is-invalid');
                        }
                    }
                } else {
                    document.getElementById("ErrorServer").classList.remove('d-none');
                }
                throw new Error(`Response ${respuesta.status}`);
            }

            alert("Curso actualizado correctamente");

            window.location.href = "cursos.html";

        } catch (error) {
            if(error instanceof TypeError){
                document.getElementById("ErrorServer").textContent = "Error al cargar los datos del curso";
                document.getElementById("ErrorServer").classList.remove('d-none'); 
            }
            console.error(error);
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {

    cargarCurso();
    iniciar();

});