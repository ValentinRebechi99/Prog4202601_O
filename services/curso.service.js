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
        estado: 'estado',
        idUsuarioModificacion: 'id_usuario_modificacion',
        fechaHoraModificacion: 'fecha_hora_modificacion'
    };

    constructor() {
        super();
        this.repository = new CursoRepository();
    }

    async findall(filter, limit, offset, order){
        const sqlFilter = this.mapKeysToColumns(filter, CursoService.KEYS_MAP);
        const sqlOrder = this.mapKeysToColumns(order, CursoService.KEYS_MAP);

        const respuestaBD = await this.repository.findall(sqlFilter, limit, offset, sqlOrder);
        const respuesta = respuestaBD.map(curso => (new CursoResponseDTO(curso)));
        return respuesta;
    }

    async findbyid(cursoID){
        const respuestaBD = await this.repository.findById(cursoID);
        const respuesta = respuestaBD.map(curso => (new CursoResponseDTO(curso)));
        return respuesta;
    }

    async create(nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_maximos, id_usuario_modificacion){
        const respuestaBD = await this.repository.create(nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_maximos, id_usuario_modificacion);
        const respuesta = respuestaBD.map(curso => (new CursoResponseDTO(curso)));
        return respuesta;
    }

    async update(cursoId, nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_max, id_curso_estado, id_usuario_modificacion){
        const respuestaBD = await this.respuesta.update(cursoId, nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_max, id_curso_estado, id_usuario_modificacion);
        const respuesta = respuestaBD.map(curso => (new CursoResponseDTO(curso)));
        return respuesta;
    }

    async delete(cursoID){
        const respuestaBD = await this.respuesta.destroy(cursoID);
        const respuesta = respuestaBD.map(curso => (new CursoResponseDTO(curso)));
        return respuesta;
    }
}