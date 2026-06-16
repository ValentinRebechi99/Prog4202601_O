const envio = document.getElementById("btnIncioSesion");
    envio.addEventListener("click", async (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const obj = {
            username: document.getElementById("name").value,
            password: document.getElementById("pwd").value,
        };
        document.getElementById("ErrorServer").classList.add('d-none');
        try {

            const respuesta = await fetch("/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(obj)

                }

            );

            if (!respuesta.ok) {
                if (respuesta.status == 400){
                    document.getElementById("ErrorServer").classList.remove('d-none');
                    document.getElementById("ErrorServer").textContent = "Usuario o Contraseña invalidos";
                } 
                throw new Error(`Response ${respuesta.status}`);
            }

            const datos = await respuesta.json();
            localStorage.setItem('auth_token', datos.token);
            document.cookie = `auth_token=${datos.token}; path=/; max-age=3600; SameSite=Strict`;

            alert("inicio de sesion correcto");

            window.location.href = "/";

        } catch (error) {
            if(error instanceof TypeError){
                document.getElementById("ErrorServer").classList.remove('d-none'); 
                document.getElementById("ErrorServer").textContent = "error interno del servidor";
            }
            console.error(error);
        }

    });