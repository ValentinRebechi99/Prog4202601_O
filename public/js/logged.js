async function isUserLogged(){
    try
    {
        const token = localStorage.getItem('auth_token');
        const respuesta = await fetch("http://localhost:3000/auth/validate",
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
                //localStorage.removeItem('auth_token');
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

        //implementar admin
        if(1==2){
            const  ElementsAdmin = document.getElementsByClassName("AdminOnly");

            Array.from(ElementsAdmin).forEach(element => {
                element.classList.remove("d-none");
            });
        }
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
    window.location.href = "/";
    return null;
});