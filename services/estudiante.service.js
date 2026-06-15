import EstudianteRepository from "../repositories/estudiante.repository.js";
import EstudianteResponseDTO from "../dtos/estudiante.response.dto.js";
import BaseService from "./base.services.js";

export default class EstudianteService extends BaseService {
    static KEYS_MAP = {
        idEstudiante: 'id_estudiante',
        documento: 'documento',
        apellido: 'apellido',
        nombres: 'nombres',
        email: 'email',
        fechaNacimiento: 'fecha_nacimiento',
        activo: 'activo',
        idUsuarioModificacion: 'id_usuario_modificacion',
        fechaHoraModificacion: 'fecha_hora_modificacion'
    };

    constructor() {
        super();
        this.repository = new EstudianteRepository();
    }

    async findall(filter, limit, offset, order){
        const sqlFilter = this.mapKeysToColumns(filter, EstudianteService.KEYS_MAP);
        const sqlOrder = this.mapKeysToColumns(order, EstudianteService.KEYS_MAP);
        const respuestaBD = await this.repository.findall(sqlFilter, limit, offset, sqlOrder);
        const respuesta = respuestaBD.map(estudiante => (new EstudianteResponseDTO(estudiante)));
        return respuesta;
    }

    async create(documento, apellido, nombres, email, fecha_nacimiento, activo ,idUsuarioModificacion=2){
        const respuestaBD = await this.repository.create(documento, apellido, nombres, email, fecha_nacimiento, activo, idUsuarioModificacion);
        const respuesta = respuestaBD.map(estudiante => (new EstudianteResponseDTO(estudiante)));
        return respuesta;
    }

    async update(idEstudiante,documento, apellido, nombres, email, fechaNacimiento, activo, idUsuarioModificacion=2){

        const respuestaBD = await this.repository.update(idEstudiante,documento, apellido, nombres, email, fechaNacimiento, activo, idUsuarioModificacion);
        const respuesta = respuestaBD.map(estudiante => (new EstudianteResponseDTO(estudiante)));
        return respuesta;
    }

    async delete(estudianteID, idUsuarioModificacion=2){
        const respuestaBD = await this.repository.destroy(estudianteID, idUsuarioModificacion=2);
        const respuesta = respuestaBD.map(estudiante => (new EstudianteResponseDTO(estudiante)));
        return respuesta;
    }
}