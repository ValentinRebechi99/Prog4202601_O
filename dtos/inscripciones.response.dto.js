export default class InscripcionResponseDTO {
    constructor(inscripcion) {
        this.idInscripcion = inscripcion.id_inscripcion;
        this.idCurso = inscripcion.id_curso;
        this.idEstudiante = inscripcion.id_estudiante;
        this.documento = inscripcion.documento;
        this.apellido = inscripcion.apellido;
        this.nombres = inscripcion.nombres;
        this.fechaHoraInscripcion = inscripcion.fecha_hora_inscripcion;
        this.id_inscripcion_estado = inscripcion.id_inscripcion_estado;
        this.idUsuarioModificacion = inscripcion.id_usuario_modificacion;
        this.fechaHoraModificacion = inscripcion.fecha_hora_modificacion;
    }
}