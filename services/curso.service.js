import CursoRepository from "../repositories/curso.repository.js";
import CursoResponseDTO from "../dtos/curso.response.dto.js";
import BaseService from "./base.services.js";

export default class CursoService extends BaseService {
    static KEYS_MAP = {
        idCurso: 'id_curso',
        nombre: 'nombre',
        descripcion: 'descripcion',
        fechaInicio: 'fecha_inicio',
        cantidadHoras: 'cantidad_horas',
        inscriptosMax: 'inscriptos_max',
        idCursoEstado: 'id_curso_estado',
        lleno: 'lleno',
        estado: 'estado',
        idUsuarioModificacion: 'id_usuario_modificacion',
        fechaHoraModificacion: 'fecha_hora_modificacion',
        inscriptos: 'inscriptos'
    };

    constructor() {
        super();
        this.repository = new CursoRepository();
    }

    async findall(filter, limit, offset, order) {
        const sqlFilter = this.mapKeysToColumns(filter, CursoService.KEYS_MAP);
        const sqlOrder = this.mapKeysToColumns(order, CursoService.KEYS_MAP);
        const respuestaBD = await this.repository.findall(sqlFilter, limit, offset, sqlOrder);
        const respuesta = respuestaBD.map(curso => (new CursoResponseDTO(curso)));
        return respuesta;
    }

    async create(nombre, descripcion, fechaInicio, cantidadHoras, inscriptosMaximos, id_curso_estado, idUsuarioModificacion) {
        const respuestaBD = await this.repository.create(nombre, descripcion, fechaInicio, cantidadHoras, inscriptosMaximos, id_curso_estado, idUsuarioModificacion);
        return new CursoResponseDTO(respuestaBD);
    }

    async update(cursoId, nombre, descripcion, fechaInicio, cantidadHoras, inscriptosMax, idCursoEstado, idUsuarioModificacion) {
        const respuestaBD = await this.repository.update(cursoId, nombre, descripcion, fechaInicio, cantidadHoras, inscriptosMax, idCursoEstado, idUsuarioModificacion);
        const respuesta = respuestaBD.map(curso => (new CursoResponseDTO(curso)));
        return respuesta;
    }

    async delete(cursoID, idUsuarioModificacion=2){
        const respuestaBD = await this.repository.destroy(cursoID, idUsuarioModificacion);
        const respuesta = respuestaBD.map(curso => (new CursoResponseDTO(curso)));
        return respuesta;
    }

    async isFull(cursoID){
        //{"lleno":"true","id_curso":2}
        const filter = {
            lleno: "true",
            id_curso: cursoID,
        };
        const respuestaBD = await this.repository.findall(filter, null, null, null);
        return respuestaBD=="";
    }
}