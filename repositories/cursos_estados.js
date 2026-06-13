import conexion from "./conexion.js"

class CursosEstados {

    findById = async (id_curso_estado) => {
        const strSql = "SELECT * FROM public.cursos_estados WHERE id_curso_estado = $1;";
        const {rows} = await conexion.query(strSql,[id_curso_estado]);
        return rows;
    }
}

export default CursosEstados;