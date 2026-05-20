import Curso from "../database/curso.js";

class CursosController{
    constructor() {
        this.database = new Curso();
    }

    findAll = async (req, res) => {
        try {
            const data = await this.database.findall();
            res.send(data);
        }
        catch(exc){
            throw exc;
        }
    }

    findById = async (req, res) => {
        try {
            const Curso_id = req.params.cursoId;
            if(!Curso_id) {
                res.status(404).send({ status: "Fallo", data: { error: "El parámetro CursoID no puede ser vacío." } });
            }
            const data = await this.database.findById(parseInt(Curso_id));
            res.send(data);
        }
        catch(exc){
            throw exc;
        }
    }

    create = async (req, res) => {
        const { body } = req;
        //nombre,descripcion,fecha_inicio,cantidad_horas,inscriptos_maximos,id_usuario_modificacion,fecha_modificacion
        //fechas en YYYY-MM-DD
        if (!body.nombre || !body.descripcion || !body.fecha_inicio || !body.cantidad_horas || !body.inscriptos_maximos){
            res
                .status(404)
                .send({
                    status: "Fallo",
                    data: {
                        error: "Faltan datos para poder crear el curso"
                    }
                });
        }
        const data = await this.database.create(body.nombre, body.descripcion, body.fecha_inicio, body.cantidad_horas, body.inscriptos_maximos,0);
        res.send(data);
    }

    update = async (req, res) => {
        const { body } = req;
        const Curso_id = req.params.cursoId;
        if (!Curso_id || !body.nombre || !body.descripcion || !body.fecha_inicio || !body.cantidad_horas || !body.inscriptos_maximos || !body.id_curso_estado){
            res
                .status(404)
                .send({
                    status: "Fallo",
                    data: {
                        error: "Faltan datos para poder crear el curso"
                    }
                });
        }
        const data = await this.database.update(Curso_id, body.nombre, body.descripcion, body.fecha_inicio, body.cantidad_horas, body.inscriptos_maximos, body.id_curso_estado, 0);
        res.send(data);
    }

    destroy = async (req, res) => {
        const Curso_id = req.params.cursoId;
        if(!Curso_id) {
            res.status(404).send({ status: "Fallo", data: { error: "El parámetro CursoID no puede ser vacío." } });
        }
        const data = await this.database.destroy(Curso_id);
        res.send(data);
    }
}

export default CursosController;