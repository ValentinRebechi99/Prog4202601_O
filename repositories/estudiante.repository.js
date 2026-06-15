import conexion from "./conexion.js"

export default class EstudianteRepository {
    findall = async (filter, limit, offset, order) => {
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
            SELECT id_estudiante,
                documento,
                apellido,
                nombres,
                email,
                fecha_nacimiento 
            FROM public.estudiantes 
            WHERE activo = 1
            ${strWhere}
            ${strOrder}
            ${strLimit}
            ${strOffset};        
        `;
        const { rows } = await client.query(strSql);
        client.release();
        return rows;
    }

    create = async (documento, apellido, nombres, email, fecha_nacimiento, activo, id_usuario_modificacion) => {
        const client = await conexion.createConnection()
        const fecha_modificacion = new Date().toISOString().split('T')[0];
        const strSql = `
            INSERT INTO public.estudiantes
            (documento, apellido, nombres, email, fecha_nacimiento, activo, id_usuario_modificacion, fecha_hora_modificacion)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        /* INSERT INTO public.cursos  */
        try {
            const parametros = [
                documento,
                apellido,
                nombres,
                email,
                fecha_nacimiento,
                activo,
                id_usuario_modificacion,
                fecha_modificacion
            ];

            const { rows } = await client.query(strSql, parametros);

            client.release();

            return rows[0];

        } catch (error) {

            client.release();
            console.error(error);
            throw error;
        }
    }



    update = async (idEstudiante, documento, apellido, nombres, email, fechaNacimiento, activo, idUsuarioModificacion) => {
        const client = await conexion.createConnection()
        const fecha_modificacion = new Date().toISOString().split('T')[0];
        const strSql = `
            UPDATE public.estudiantes
            SET documento=$1, apellido=$2, nombres=$3, email=$4, fecha_nacimiento=$5, activo=$6, id_usuario_modificacion=$7, fecha_hora_modificacion=$8
            WHERE id_estudiante=$9;
        `;

        const parametros = [
            documento,
            apellido,
            nombres,
            email,
            fechaNacimiento,
            activo,
            idUsuarioModificacion,
            fecha_modificacion,
            idEstudiante
        ];

        const { rows } = await client.query(strSql, parametros);

        client.release();
        return rows;
    }

    destroy = async (estudianteID, idUsuarioModificacion) => {
        const client = await conexion.createConnection()
        const strSql = `
        SELECT id_estudiante,
                documento,
                apellido,
                nombres,
                email,
                fecha_nacimiento 
            FROM public.estudiantes 
            WHERE id_estudiante=$1;`
        const { rows } = await client.query(strSql, [estudianteID]);
        const estudiante = rows[0];
        if (!estudiante) {
            console.error("no hay curso");
            return null;
        }
        const rowsUpdate = await this.update(
            estudiante.id_estudiante,
            estudiante.documento,
            estudiante.apellido,
            estudiante.nombres,
            estudiante.email,
            estudiante.fecha_nacimiento,
            0,
            idUsuarioModificacion
        );
        client.release();
        return rowsUpdate;
    }

}