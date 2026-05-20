import conexion from "./conexion.js"

class CursosEstados {
    create = async () => {
        const strSql = "INSERT INTO public.cursos_estados (descripcion, es_activo) VALUES('', 1);";
        await conexion.query(strSql);
        const {rows} = await conexion.query("SELECT * FROM table_name ORDER BY id_curso_estado DESC LIMIT 1;")
        return rows;
    }

    update = async (id_curso_estado) => {
        const strSql = "UPDATE public.cursos_estados SET es_activo=0 WHERE id_curso_estado=$1;"
        await conexion.query(strSql, id_curso_estado);
        return null;
    }
}

export default CursosEstados;