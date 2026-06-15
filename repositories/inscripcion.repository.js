import conexion from "./conexion.js"

export default class InscripcionRepository {
    findall = async (filter,limit,offset,order) => {
        const client = await conexion.createConnection();

        let strWhere = '';
        let strOrder = '';
        let strLimit = '';
        let strOffset = '';
        
        if (filter && Object.keys(filter).length > 0) {
            Object.entries(filter).forEach(([key, value]) => {
                if (typeof value === 'string') {
                    strWhere += `AND ${key} LIKE '%${value}%'`
                } else {
                    strWhere += `AND ${key} = ${value}`
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
            SELECT i.id_inscripcion,
                i.id_curso, 
                i.id_estudiante,
                i.fecha_hora_inscripcion,
                ie.descripcion  as estado,
                i.id_usuario_modificacion,
                i.fecha_hora_modificacion
            FROM public.inscripciones i 
            INNER JOIN inscripciones_estados ie on i.id_inscripcion_estado = ie.id_inscripcion_estado
            WHERE i.id_inscripcion_estado=1;
            ${strWhere}
            ${strOrder}
            ${strLimit}
            ${strOffset};        
        `;
        const {rows} = await client.query(strSql);
        client.release();
        return rows;
    }

    create = async (id_curso, id_estudiante, id_inscripcion_estado, id_usuario_modificacion) => {
        const client = await conexion.createConnection()
        const fecha_modificacion = new Date().toISOString().split('T')[0]; 
        const strSql = `
            INSERT INTO public.inscripciones
            (id_curso, id_estudiante, fecha_hora_inscripcion, id_inscripcion_estado, id_usuario_modificacion, fecha_hora_modificacion)
            VALUES($1, $2, $3, $4, $5, $6);
        `;
        try {
            const parametros = [
                id_curso,
                id_estudiante,
                fecha_modificacion,
                id_inscripcion_estado,
                id_usuario_modificacion,
                fecha_modificacion
            ];
        
            const { rows } = await client.query(strSql, parametros);
            const nuevoId = rows[0].id_curso;
            const response = await this.findById(nuevoId);
            client.release();
            return response;
        }
        catch(error) {
            client.release();
            console.error("Error en el controlador (create):", error);
        }
    }



    update = async (idInscripcion,idCurso, idEstudiante, fechaHoraInscripcion, idInscripcionEstado, idUsuarioModificacion) => {
        const client = await conexion.createConnection()
        const fecha_modificacion = new Date().toISOString().split('T')[0];
        const strSql = `
            UPDATE public.inscripciones
            SET id_curso=$1, id_estudiante=$2, fecha_hora_inscripcion=$3, id_inscripcion_estado=$4, id_usuario_modificacion=$5, fecha_hora_modificacion=$6
            WHERE id_inscripcion=$7;
        `;

        const parametros = [
            idCurso,
            idEstudiante,
            fechaHoraInscripcion,
            idInscripcionEstado,
            idUsuarioModificacion,
            fecha_modificacion,
            idInscripcion
        ];

        const { rows } = await client.query(strSql, parametros);
        client.release();
        return rows;
    }

    destroy = async (inscripcionId, idUsuarioModificacion) => {
        const client = await conexion.createConnection()
        const strSql = `
        SELECT id_inscripcion,
            id_curso,
            id_estudiante,
            fecha_hora_inscripcion,
            id_inscripcion_estado,
            id_usuario_modificacion,
            fecha_hora_modificacion
        FROM public.inscripciones 
        WHERE id_inscripcion=$1;`
        const { rows } = await client.query(strSql, [inscripcionId]);
        const inscripcion = rows[0];
        if (!inscripcion) {
            console.error("no hay inscripcion");
            return null;
        }
        const rowsUpdate = await this.update(
            inscripcion.id_inscripcion,
            inscripcion.id_curso,
            inscripcion.id_estudiante,
            inscripcion.fecha_hora_inscripcion,
            2,
            inscripcion.id_usuario_modificacion
        );
        client.release();
        return rowsUpdate;
    }

}