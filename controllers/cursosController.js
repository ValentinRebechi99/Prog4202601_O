import CursoService from "../services/curso.service.js";

class CursosController {
    constructor() {
        this.servicio = new CursoService();
    }

    findAll = async (req, res) => {
        console.log(req.query);
        console.log(req.filter);
        try {
            const { filter, limit, offset, order } = req;
            const data = await this.servicio.findall(filter, limit, offset, order);
            res.send(data);
        }
        catch (exc) {
            console.error(exc)
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
        }
    }

    create = async (req, res) => {
        try {
            const { body } = req;
            const data = await this.servicio.create(
                body.nombre,
                body.descripcion,
                body.fechaInicio,
                body.cantidadHoras,
                body.inscriptosMaximos,
                body.idCursoEstado,
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
            const cursoId = req.params.cursoId;
            const data = await this.servicio.update(cursoId, body.nombre, body.descripcion, body.fechaInicio, body.cantidadHoras, body.inscriptosMaximos, body.idCursoEstado, 1);
            res.send(data);
        }
        catch (error) {
            console.error("Error en el controlador (update):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    delete = async (req, res) => {
        try {
            const cursoId = req.params.cursoId;
            if (!cursoId) {
                res.status(400).send({ status: "Fallo", data: { error: "El parámetro cursoID no puede ser vacío." } });
            }
            const data = await this.servicio.delete(parseInt(cursoId));
            res.send(data);
        } catch (error) {
            console.error("Error en el controlador (update):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default CursosController;