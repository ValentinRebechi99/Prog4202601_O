import conexion from "./conexion.js"
import CursosEstados from "./cursos_estados.js"

class Curso {
    findall = async () => {
        const strSql = `
        SELECT 
            id_curso,
            nombre,
            descripcion,
            fecha_inicio,
            cantidad_horas,
            inscriptos_max,
            id_curso_estado
        FROM public.cursos
    `;

    const { rows } = await conexion.query(strSql);

    return rows;

        
    }

    findById = async (cursoId) => {
        const strSql = 'SELECT * FROM public.cursos WHERE id_curso = $1';
        const {rows} = await conexion.query(strSql,[cursoId]);
        return rows;
    }

    create = async (nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_max, id_usuario_modificacion) => {
        const fecha_modificacion = new Date().toISOString().split('T')[0];
        
        const id_estado = (await CursosEstados().create())[0].id_curso_estado; 
    
        const strSql = `
            INSERT INTO public.cursos 
            (nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_max, id_curso_estado, id_usuario_modificacion, fecha_hora_modificacion) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id_curso;
        `;
    
        const parametros = [
            nombre, 
            descripcion, 
            fecha_inicio, 
            cantidad_horas, 
            inscriptos_max, 
            id_estado, 
            id_usuario_modificacion, 
            fecha_modificacion
        ];
    
        const { rows } = await conexion.query(strSql, parametros);
        const nuevoId = rows[0].id_curso;
    
        return this.findById(nuevoId);
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
    
        await conexion.query(strSql, parametros);
        return findById(cursoId);
    }

    destroy = async (cursoId) => {
        destroy = async (cursoId) => {
            const curso = await this.findById(cursoId); 
            
            if (!curso) {
                return null;
            }
        
            const estado_id = curso.id_curso_estado;
            await CursosEstados.update(cursoId, estado_id); 
            
            return null;
        }
    }

}

export default Curso;