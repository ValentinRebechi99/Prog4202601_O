const iniciar = () => {
    const envio = document.getElementById("btnGuardarCurso");
    envio.addEventListener("click", async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const obj = {
            nombre: document.getElementById("nombre").value,
            descripcion: document.getElementById("descripcion").value,
            fecha_inicio: document.getElementById("fechaInicio").value,
            cantidad_horas: document.getElementById("cantidadHoras").value,
            inscriptos_maximos: document.getElementById("cantidadInscriptos").value
        };
try {
            
            const respuesta = await fetch("http://localhost:3000/cursos",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(obj)
                    
                }
                
            );
                
            if (!respuesta.ok) {
                throw new Error("Error al guardar");
            }

            const datos = await respuesta.json();

            console.log(datos);

            alert("Curso guardado correctamente");

            document.getElementById("formCurso").reset();

        } catch (error) {

            console.error(error);

            alert("Error al guardar curso");
        }
        console.log(obj);



        
    });
};
document.addEventListener("DOMContentLoaded", iniciar);
