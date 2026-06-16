const token = localStorage.getItem('auth_token');

const iniciar = () => {
    const envio = document.getElementById("btnGuardarCurso");
    envio.addEventListener("click", async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const obj = {
            nombre: document.getElementById("nombre").value,
            descripcion: document.getElementById("descripcion").value,
            fechaInicio: document.getElementById("fechaInicio").value,
            cantidadHoras: document.getElementById("cantidadHoras").value,
            inscriptosMaximos: document.getElementById("cantidadInscriptos").value,
            idCursoEstado: parseInt(
                document.getElementById("estado").value
            )
        };

        document.getElementById("nombre").classList.remove('is-invalid');
        document.getElementById("descripcion").classList.remove('is-invalid');
        document.getElementById("fechaInicio").classList.remove('is-invalid');
        document.getElementById("cantidadHoras").classList.remove('is-invalid');
        document.getElementById("cantidadInscriptos").classList.remove('is-invalid');
        document.getElementById("ErrorServer").classList.add('d-none');

        try {

            const respuesta = await fetch("/cursos",
                {
                    method: "POST",

                    headers: {
                        "Authorization": `Bearer ${token}`,
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
                        }
                    }
                } else {
                    document.getElementById("ErrorServer").classList.remove('d-none');
                }
                throw new Error(`Response ${respuesta.status}`);
            }

/*             const datos = await respuesta.json();

            console.log(datos); */

            alert("Curso guardado correctamente");

            window.location.href = "/cursos.html";

        } catch (error) {
            if(error instanceof TypeError){
                document.getElementById("ErrorServer").classList.remove('d-none'); 
            }
            console.error(error);
        }

    });
};
document.addEventListener("DOMContentLoaded", iniciar);
