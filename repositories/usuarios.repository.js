import conexion from "./conexion.js";
export default class UsuarioRepository {
    async find(username, password) {
        const client = await conexion.createConnection();
        const strSql= `
            SELECT id_usuario AS userId, nombre, apellido, nombre_usuario AS username 
            FROM usuarios 
            WHERE nombre_usuario = $1 
            AND contrasenia = encode(digest($2, 'sha256'), 'hex')
            AND activo = 1;
        `;
        const parametros = [
            username,
            password
        ];
        const { rows } = await client.query(strSql, parametros);
        client.release();
        return rows[0];
    }

    findById = async (userId) => {
        const client = await conexion.createConnection();
        const strSql = `
            SELECT id_usuario AS userId, nombre, apellido, nombre_usuario AS username 
            FROM usuarios 
            WHERE id_usuario = $1 AND activo = 1;`;
        const { rows } = await client.query(strSql, [userId]);
        return rows[0];
    };
}