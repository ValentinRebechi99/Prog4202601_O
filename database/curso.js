import conexion from "./conexion.js"
import CursosEstados from "./cursos_estados.js"

class Curso {
    constructor() {
        this.estados = new CursosEstados();
    }
    findall = async () => {
        let strSql = 'select c.id_curso, c.nombre, c.descripcion, c.fecha_inicio, c.cantidad_horas, c.inscriptos_max, c.fecha_hora_modificacion ,ce.descripcion AS estado FROM public.cursos c INNER JOIN public.cursos_estados ce ON c.id_curso_estado = ce.id_curso_estado where c.id_curso_estado != 4;'
        const {rows} = await conexion.query(strSql);
        return rows;
    }

    findById = async (cursoId) => {
        const strSql = 'select c.id_curso, c.nombre, c.descripcion, c.fecha_inicio, c.cantidad_horas, c.inscriptos_max, c.fecha_hora_modificacion ,ce.descripcion AS estado FROM public.cursos c INNER JOIN public.cursos_estados ce ON c.id_curso_estado = ce.id_curso_estado where c.id_curso = $1;';
        const {rows} = await conexion.query(strSql,[cursoId]);
        return rows;
    }

    create = async (nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_maximos, id_usuario_modificacion) => {
        const fecha_modificacion = new Date().toISOString().split('T')[0]; 
        const strSql = `
            INSERT INTO public.cursos 
            (nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_max, id_curso_estado, id_usuario_modificacion, fecha_hora_modificacion) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id_curso;
        `;
        try{
            const parametros = [
                nombre, 
                descripcion, 
                fecha_inicio, 
                cantidad_horas, 
                inscriptos_maximos, 
                1, 
                id_usuario_modificacion, 
                fecha_modificacion
            ];
        
            const { rows } = await conexion.query(strSql, parametros);
            const nuevoId = rows[0].id_curso;
            const response = await this.findById(nuevoId);
            return response;
        }
        catch(error) {
            console.error("Error en el controlador (create):", error);
        }
    }

    

    update = async (cursoId, nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_max, id_curso_estado, id_usuario_modificacion) => {
        const fecha_modificacion = new Date().toISOString().split('T')[0];
        
        const strSql = `
            UPDATE public.cursos 
            SET nombre=$1, descripcion=$2, fecha_inicio=$3, cantidad_horas=$4, inscriptos_max=$5, id_curso_estado=$6, id_usuario_modificacion=$7, fecha_hora_modificacion=$8 
            WHERE id_curso=$9;
        `;
        
        const parametros = [
            nombre, 
            descripcion, 
            fecha_inicio, 
            cantidad_horas, 
            inscriptos_max, 
            id_curso_estado, 
            id_usuario_modificacion, 
            fecha_modificacion,
            cursoId
        ];
    
        const { rows } = await conexion.query(strSql, parametros);

        return rows;
    }

    destroy = async (cursoId) => {
        
        const strSql = 'SELECT c.id_curso, c.nombre, c.descripcion, c.fecha_inicio, c.cantidad_horas, c.inscriptos_max, c.fecha_hora_modificacion, ce.descripcion AS estado FROM public.cursos c INNER JOIN public.cursos_estados ce ON c.id_curso_estado = ce.id_curso_estado WHERE c.id_curso = $1;';
        const { rows } = await conexion.query(strSql, [cursoId]);
        const curso = rows[0]; 
        if (!curso) {
            console.error("no hay curso");
            return null;
        }
        const { rows: rowsUpdate } = await this.update(
            curso.id_curso,
            curso.nombre,
            curso.descripcion,
            curso.fecha_inicio,
            curso.cantidad_horas,
            curso.inscriptos_max,
            4,
            1
        );
        return rowsUpdate;
    }

}

export default Curso;