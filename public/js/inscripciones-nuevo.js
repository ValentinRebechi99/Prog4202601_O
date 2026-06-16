const iniciar = () => {

    const envio = document.getElementById("btnGuardarInscripcion");

    envio.addEventListener("click", async (evt) => {
        evt.preventDefault();

        const obj = {
            idCurso: parseInt(document.getElementById("idCurso").value),
            idEstudiante: parseInt(document.getElementById("idEstudiante").value),
            idInscripcionEstado: 1, // siempre activa
            fechaHoraInscripcion: new Date().toISOString()
        };

        

        document.getElementById("ErrorServer").classList.add("d-none");

        try {

            const respuesta = await fetch("http://localhost:3000/inscripciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                console.log(error);

                document.getElementById("ErrorServer").classList.remove("d-none");

                throw new Error(`HTTP ${respuesta.status}`);
            }

            alert("Inscripción creada correctamente");
            window.location.href = "inscripciones.html";

        } catch (error) {
            console.error(error);
        }
    });
};



const cargarEstudiantes = async () => {
    const res = await fetch("http://localhost:3000/estudiantes");
    const estudiantes = await res.json();

    const select = document.getElementById("idEstudiante");

    select.innerHTML = `<option value="">Seleccione estudiante</option>`;

    estudiantes.forEach(e => {
        const option = document.createElement("option");
        option.value = e.idEstudiante;
        option.textContent = `${e.documento} - ${e.apellido} ${e.nombres}`;
        select.appendChild(option);
    });
};

const cargarCursos = async () => {
    const res = await fetch("http://localhost:3000/cursos");
    const cursos = await res.json();

    const select = document.getElementById("idCurso");

    select.innerHTML = `<option value="">Seleccione curso</option>`;

    cursos.forEach(curso => {
        const option = document.createElement("option");
        option.value = curso.idCurso;
        option.textContent = curso.nombre;
        select.appendChild(option);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    cargarCursos();
    cargarEstudiantes();
    iniciar();
});