import InscripcionRepository from "../repositories/inscripcion.repository.js";
import InscripcionResponseDTO from "../dtos/inscripciones.response.dto.js";
import BaseService from "./base.services.js";

export default class InscripcionService extends BaseService {
    static KEYS_MAP = {
        idInscripcion: 'id_inscripcion',
        idCurso: 'id_curso', 
        idEstudiante: 'id_estudiante', 
        fechaHoraInscripcion: 'fecha_hora_inscripcion',
        idInscripcionEstado: 'id_inscripcion_estado',
        idUsuarioModificacion:'id_usuario_modificacion',
        fechaHoraModificacion: 'fecha_hora_modificacion',

        idEstudiante: 'id_estudiante',
        documento: 'documento',
        apellido: 'apellido',
        nombres: 'nombres',
        email: 'email',
        fechaNacimiento: 'fecha_nacimiento',
        activo: 'activo',
        idUsuarioModificacion: 'id_usuario_modificacion'
    };

    constructor() {
        super();
        this.repository = new InscripcionRepository();
    }

    async findall(filter, limit, offset, order){
        const sqlFilter = this.mapKeysToColumns(filter, InscripcionService.KEYS_MAP);
        const sqlOrder = this.mapKeysToColumns(order, InscripcionService.KEYS_MAP);
        const respuestaBD = await this.repository.findall(sqlFilter, limit, offset, sqlOrder);
        const respuesta = respuestaBD.map(inscripcion => (new InscripcionResponseDTO(inscripcion)));
        return respuesta;
    }

    async create(idCurso, idEstudiante, idInscripcionEstado, idUsuarioModificacion=2){
        const respuestaBD = await this.repository.create(idCurso, idEstudiante, idInscripcionEstado, idUsuarioModificacion);
        const respuesta = respuestaBD.map(inscripcion => (new InscripcionResponseDTO(inscripcion)));
        return respuesta;
    }

    async update(idInscripcion,idCurso, idEstudiante, fechaHoraInscripcion, idInscripcionEstado, idUsuarioModificacion=2){
        const respuestaBD = await this.repository.update(idInscripcion,idCurso, idEstudiante, fechaHoraInscripcion, idInscripcionEstado, idUsuarioModificacion);
        const respuesta = respuestaBD.map(inscripcion => (new InscripcionResponseDTO(inscripcion)));
        return respuesta;
    }

    async delete(idInscripcion, idUsuarioModificacion=2){
        const respuestaBD = await this.repository.destroy(idInscripcion, idUsuarioModificacion=2);
        const respuesta = respuestaBD.map(inscripcion => (new InscripcionResponseDTO(inscripcion)));
        return respuesta;
    }
}