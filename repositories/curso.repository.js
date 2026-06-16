import conexion from "./conexion.js"

export default class CursoRepository {
    findall = async (filter,limit,offset,order) => {
        const client = await conexion.createConnection();

        let strWhere = '';
        let strOrder = '';
        let strLimit = '';
        let strOffset = '';
        if (filter && Object.keys(filter).length > 0) {

            Object.entries(filter).forEach(([key, value]) => {
                if (key === 'lleno') {
                    if (value === 'true') {
                        strWhere += ` AND c.inscriptos_max > (
                            SELECT COUNT(*) 
                            FROM public.inscripciones i 
                            WHERE i.id_curso  = c.id_curso
                        ) `
                    }
                } 
                else if (typeof value === 'string') {
                    strWhere += ` AND c.${key} ILIKE '%${value}%' `
                } 
                else {
                    strWhere += ` AND c.${key} = ${value} `
                }
            });
        }
        if (order && Object.keys(order).length > 0) {
            Object.entries(order).forEach(([key, value]) => {
                strOrder += `${key} ${value}, `
            });
            strOrder = `ORDER BY ${strOrder.slice(0, -2)} `
        }

        if (limit) {
            strLimit = `LIMIT ${limit} `
        }

        if (offset) {
            strOffset = `OFFSET ${offset} `
        }

        let strSql = `
            SELECT c.id_curso,
                c.nombre,
                c.descripcion,
                c.fecha_inicio,
                c.cantidad_horas,
                c.inscriptos_max,
                c.fecha_hora_modificacion
                ,ce.descripcion AS estado,
                (
                    SELECT COUNT(*) 
                    FROM public.inscripciones i 
                    WHERE i.id_curso  = c.id_curso
                ) AS inscriptos
            FROM public.cursos c 
            INNER JOIN public.cursos_estados ce ON c.id_curso_estado = ce.id_curso_estado 
            WHERE c.id_curso_estado != 4
            ${strWhere}
            ${strOrder}
            ${strLimit}
            ${strOffset};        
        `;
        const { rows } = await client.query(strSql);
        client.release();
        return rows;
    }

    create = async (nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_maximos, id_curso_estado = 1, id_usuario_modificacion) => {
        const client = await conexion.createConnection()
        const fecha_modificacion = new Date().toISOString().split('T')[0];
        const strSql = `
            INSERT INTO public.cursos 
            (nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_max, id_curso_estado, id_usuario_modificacion, fecha_hora_modificacion) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id_curso;
        `;
        try {
            const parametros = [
                nombre,
                descripcion,
                fecha_inicio,
                cantidad_horas,
                inscriptos_maximos,
                id_curso_estado,
                id_usuario_modificacion,
                fecha_modificacion
            ];

            const { rows } = await client.query(strSql, parametros);
            const response = rows[0];
            client.release();
            return response;
        }
        catch (error) {
            client.release();
            console.error("Error en el controlador (create):", error);
        }
    }



    update = async (cursoId, nombre, descripcion, fecha_inicio, cantidad_horas, inscriptos_max, id_curso_estado, id_usuario_modificacion) => {
        const client = await conexion.createConnection()
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

        const { rows } = await client.query(strSql, parametros);
        client.release();
        return rows;
    }

    destroy = async (cursoId, idUsuarioModificacion) => {
        const client = await conexion.createConnection()
        const strSql = 'SELECT c.id_curso, c.nombre, c.descripcion, c.fecha_inicio, c.cantidad_horas, c.inscriptos_max, c.fecha_hora_modificacion, ce.descripcion AS estado FROM public.cursos c INNER JOIN public.cursos_estados ce ON c.id_curso_estado = ce.id_curso_estado WHERE c.id_curso = $1;';
        const { rows } = await client.query(strSql, [cursoId]);
        const curso = rows[0];
        if (!curso) {
            console.error("no hay curso");
            return null;
        }
        const rowsUpdate = await this.update(
            curso.id_curso,
            curso.nombre,
            curso.descripcion,
            curso.fecha_inicio,
            curso.cantidad_horas,
            curso.inscriptos_max,
            4,
            idUsuarioModificacion
        );
        client.release();
        return rowsUpdate;
    }

}