const iniciar = () => {
    const envio = document.getElementById("btnGuardarEstudiante");
    envio.addEventListener("click", async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        const obj = {
            documento: document.getElementById("documento").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            email: document.getElementById("email").value,
            fechaNacimiento: document.getElementById("Fecha de Nacimiento").value,
            activo: document.getElementById("activo").value
        };

        console.log(obj);

    });
};

document.addEventListener("DOMContentLoaded", iniciar);
