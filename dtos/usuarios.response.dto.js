export default class UsuariosResponseDTO{
    constructor(usuario){
        this.id_usuario = usuario.id_usuario;
        this.apellido = usuario.apellido;
        this.nombre = usuario.nombre;
        this.nombre_usuario = usuario.nombre_usuario;
        this.contrasenia = usuario.contrasenia;
        this.activo = usuario.activo;
    }
}