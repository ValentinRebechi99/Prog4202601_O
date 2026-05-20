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
        try {
            const { body } = req;
            if (!body) {
                return res.status(400).send({ status: "Fallo", data: { error: "No se enviaron datos en el cuerpo de la petición." } });
            }
            if (!body.nombre || !body.descripcion || !body.fecha_inicio || !body.cantidad_horas || !body.inscriptos_maximos) {
                return res.status(400).send({
                    status: "Fallo",
                    data: { error: "Faltan datos para poder crear el curso" }
                });
            }

            const data = await this.database.create(body.nombre, body.descripcion, body.fecha_inicio, body.cantidad_horas, body.inscriptos_maximos, 1);
            return res.status(201).send(data);

        } catch (error) {
            console.error("Error en el controlador (create):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
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
        const data = await this.database.update(Curso_id, body.nombre, body.descripcion, body.fecha_inicio, body.cantidad_horas, body.inscriptos_maximos, body.id_curso_estado, 1);
        res.send(data);
    }

    destroy = async (req, res) => {

        // arreglar esto
        const Curso_id = req.params.cursoId;
        if(!Curso_id) {
            res.status(404).send({ status: "Fallo", data: { error: "El parámetro CursoID no puede ser vacío." } });
        }
        console.log(Curso_id)
        const data = await this.database.destroy(parseInt(Curso_id));
        res.send(data);
    }
}

export default CursosController;