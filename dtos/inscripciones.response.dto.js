export default class InscripcionResponseDTO {
    constructor(inscripcion) {
        this.id_inscripcion = inscripcion.id_inscripcion;
        this.id_curso = inscripcion.id_curso;
        this.id_estudiante = inscripcion.id_estudiante;
        this.documento = inscripcion.documento;
        this.apellido = inscripcion.apellido;
        this.nombres = inscripcion.nombres;
        this.fecha_hora_inscripcion = inscripcion.fecha_hora_inscripcion;
        this.id_inscripcion_estado = inscripcion.id_inscripcion_estado;
        this.idUsuarioModificacion = inscripcion.id_usuario_modificacion;
        this.fechaHoraModificacion = inscripcion.fecha_hora_modificacion;
    }
}