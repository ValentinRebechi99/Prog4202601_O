const token = localStorage.getItem('auth_token');
async function isUserLogged(){
    try
    {
        const respuesta = await fetch("/auth/validate",
            {
                method: "POST",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!respuesta.ok) {
            if (respuesta.status == 401){
                localStorage.removeItem('auth_token');
                document.cookie = "auth_token=; path=/; max-age=0; SameSite=Strict";
            } 
            throw new Error(`Response ${respuesta.status}`);
        }
        const ElementsLogged = document.getElementsByClassName("loggedOnly");

        Array.from(ElementsLogged).forEach(element => {
            element.classList.remove("d-none");
        });

        const ElementsUnlogged = document.getElementsByClassName("unloggedOnly");

        Array.from(ElementsUnlogged).forEach(element => {
            element.classList.add("d-none");
        });

        // recuento cursos
        const cursos = await fetch("/cursos",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const respuetaCursos = await cursos.json();
        const countCursos = Object.keys(respuetaCursos).length;
        document.getElementById("CursosActivos").textContent = countCursos;

        // recuento estudiantes
        const estudiantes = await fetch("/estudiantes",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const respuetaEstudiantes = await estudiantes.json();
        const countEstudiantes = Object.keys(respuetaEstudiantes).length;
        document.getElementById("cantEstudiantes").textContent = countEstudiantes;

        // recuento inscripciones
        const inscripciones = await fetch("/inscripciones",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const respuetaInscripciones = await inscripciones.json();
        const countinscripciones = Object.keys(respuetaInscripciones).length;
        document.getElementById("cantInscripciones").textContent = countinscripciones;

        await getCards();
    }
    catch(error){
        if(error instanceof TypeError){
            console.log(error);
        }
    }
}
isUserLogged();

const salir = document.getElementById("unlog");
salir.addEventListener("click", async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    localStorage.removeItem('auth_token');
    document.cookie = "auth_token=; path=/; max-age=0; SameSite=Strict";
    window.location.href = "/";
    return null;
});

async function getCards(){
    try {
        const cursosCar = await fetch("/cursos?limit=3", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!cursosCar.ok) {
            throw new Error(`Error en el servidor: ${cursosCar.status} ${cursosCar.statusText}`);
        }

        const datos = await cursosCar.json();
        console.log("Datos recibidos con éxito:", datos);

        const carrousel = document.getElementById("carrouselCursos");
        carrousel.innerHTML = "";

        datos.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <a class="course-link-card">
                    <div class="course-card">
                        <h3 class="course-name">${item.nombre}</h3>
                        <span class="cursoDescripcion">${item.descripcion}</span>
                        <br>
                        <span class="progress-text">Inscriptos: ${item.inscriptos} de ${item.inscriptosMax}</span>
                    </div>
                </a>
            `;
            carrousel.appendChild(fila);
        });

    } catch (error) {
        console.error("Hubo un fallo en la petición:", error);
    }
}