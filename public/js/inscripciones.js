const cargarCursosSelect = async () => {
    try {
        const respuesta = await fetch("http://localhost:3000/cursos");

        if (!respuesta.ok) throw new Error();

        const cursos = await respuesta.json();

        const select = document.getElementById("selectCurso");

        cursos.forEach(curso => {
            const option = document.createElement("option");
            option.value = curso.idCurso;
            option.textContent = curso.nombre;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error cargando cursos", error);
    }
};


const cargarEstudiantesPorCurso = async (cursoId) => {
    try {
        const respuesta = await fetch(
            `http://localhost:3000/inscripciones?cursoId=${cursoId}`
        );

        if (!respuesta.ok) throw new Error();

        const datos = await respuesta.json();
        console.log("Datos recibidos del servidor:", datos);
        mostrarEstudiantes(datos);

    } catch (error) {
        console.error("Error cargando estudiantes", error);
    }
};

const mostrarEstudiantes = (datos) => {
    const tabla = document.getElementById("tbodyInscripciones");
    tabla.innerHTML = "";

    datos.forEach(item => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.documento}</td>
            <td>${item.apellido}</td>
        `;
        tabla.appendChild(fila);
    });
};


document.addEventListener("DOMContentLoaded", () => {

    cargarCursosSelect();

    const select = document.getElementById("selectCurso");

    select.addEventListener("change", (e) => {
        const cursoId = e.target.value;

        if (!cursoId) return;

        cargarEstudiantesPorCurso(cursoId);
    });
});