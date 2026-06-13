import CursoService from "../services/curso.service.js";

class CursosController {
    constructor() {
        this.servicio = new CursoService();
    }

    findAll = async (req, res) => {
        try {
            const { filter, limit, offset, order} = req;
            this.servicio
            const data = await this.servicio.findall(filter, limit, offset, order);
            res.send(data);
        }
        catch(exc){
            console.error(exc)
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
        }
    }

    findById = async (req, res) => {
        try {
            const Curso_id = req.params.cursoId;
            if(!Curso_id) {
                res.status(400).send({ status: "Fallo", data: { error: "El parámetro CursoID no puede ser vacío." } });
            }
            const data = await this.servicio.findbyid(parseInt(Curso_id));
            res.send(data);
        }
        catch(exc){
            console.error(exc)
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
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

            const data = await this.database.create(
                body.nombre,
                body.descripcion,
                body.fecha_inicio,
                body.cantidad_horas,
                body.inscriptos_maximos,
                body.id_curso_estado,
                1
            ); return res.status(201).send(data);

        } catch (error) {
            console.error("Error en el controlador (create):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    update = async (req, res) => {
        try {
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
            const data = await this.servicio.update(Curso_id, body.nombre, body.descripcion, body.fecha_inicio, body.cantidad_horas, body.inscriptos_maximos, body.id_curso_estado, 1);
            res.send(data);
        }
        catch (error) {
            console.error("Error en el controlador (update):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    destroy = async (req, res) => {
        try{
            const Curso_id = req.params.cursoId;
            if(!Curso_id) {
                res.status(400).send({ status: "Fallo", data: { error: "El parámetro CursoID no puede ser vacío." } });
            }
            const data = await this.servicio.destroy(parseInt(Curso_id));
            res.send(data);
        } catch (error) {
            console.error("Error en el controlador (update):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default CursosController;