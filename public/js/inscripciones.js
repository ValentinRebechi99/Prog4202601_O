const token = localStorage.getItem('auth_token');

var SelCursoId = "";
var SelCursoNombre = "";

var pagina = 0;
const limit = 4;
document.getElementById("NumberPage").textContent = pagina + 1;
const ButtonBack = document.getElementById("ButtonBack");
const ButtonNext = document.getElementById("ButtonNext");

ButtonBack.addEventListener("click", async (evt) => {
    if (pagina != 0) {
        pagina = pagina - 1;
    }
    
    document.getElementById("NumberPage").textContent = pagina + 1;
    cargarEstudiantesPorCurso(SelCursoId);
});

ButtonNext.addEventListener("click", async (evt) => {
    pagina = pagina + 1;
    cargarEstudiantesPorCurso(SelCursoId);
});

const cargarCursosSelect = async () => {
    try {
        const respuesta = await fetch("/cursos",
        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

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
            `/inscripciones?idCurso=${cursoId}&limit=${limit}&offset=${pagina*limit}`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!respuesta.ok) throw new Error();

        const datos = await respuesta.json();
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
            <td>${item.nombres}</td>
            <td>${item.apellido}</td>
            <td>
                <div class="boton-mod">
                    <button class="btn btn-primary btn-imprimir">
                        generar certificado<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                        <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1"/>
                        <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                      </svg>
                    </button>
                </div>
            </td>
        `;

        tabla.appendChild(fila);
        fila.querySelector(".btn-imprimir").addEventListener("click", async () => {

            const confirmar = confirm(
                "¿Desea generar el certificado en pdf?"
            );

            if (!confirmar) return;

            const objPrint = {
                nombre:item.nombres,
                apellido:item.apellido,
                dni:item.documento,
                curso:SelCursoNombre
            };
            try {

                const respuesta = await fetch(
                    `/generarCertificado/`,
                    {
                        method: "POST",
                        
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        
                        body: JSON.stringify(objPrint)
                    }
                );

                if (!respuesta.ok) {
                    throw new Error();
                }
                const blob = await respuesta.blob();
                const urlPdf = URL.createObjectURL(blob);
                const enlaceDescarga = document.createElement("a");
                enlaceDescarga.href = urlPdf;
                enlaceDescarga.download = `Certificado_${item.apellido}_${item.nombres}.pdf`;
                document.body.appendChild(enlaceDescarga);
                enlaceDescarga.click();
                document.body.removeChild(enlaceDescarga);
                URL.revokeObjectURL(urlPdf);

            } catch (error) {
                alert("Error al generar pdf");
            }
        });
            
    });
};


document.addEventListener("DOMContentLoaded", () => {

    cargarCursosSelect();

    const select = document.getElementById("selectCurso");

    select.addEventListener("change", (e) => {
        pagina = 0;
        SelCursoId = e.target.value;
        SelCursoNombre = e.target.options[e.target.selectedIndex].text;
        if (!SelCursoId) return;

        cargarEstudiantesPorCurso(SelCursoId);
    });
});