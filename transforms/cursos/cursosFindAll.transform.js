const cursosFindAllTransform = (req, res, next) => {
    const filterObj = {};
    const orderObj = {};

    const { 
            idCurso,
            nombre,
            descripcion,
            fechaInicio,
            cantidadHoras,
            inscriptosMax,
            idCursoEstado,
            order,
            limit,
            offset,
            asc
          } = req.query;
    if (limit) req.limit = limit;
    if (offset) req.offset = offset;
    if (idCurso) filterObj.idCurso = parseInt(idCurso);
    if (nombre) filterObj.nombre = nombre;
    if (descripcion) filterObj.descripcion = descripcion;
    if (fechaInicio) filterObj.fechaInicio = fechaInicio;
    if (cantidadHoras) filterObj.cantidadHoras = parseInt(cantidadHoras);
    if (inscriptosMax) filterObj.inscriptosMax = parseInt(inscriptosMax);
    if (idCursoEstado) filterObj.idCursoEstado = parseInt(idCursoEstado);
    if (order){
        orderObj[order] = asc === "true" ? "ASC" : "DESC";
    } else { 
        if(!asc) {orderObj.idCurso = 'ASC';} 
        else {orderObj["idCurso"] = asc === "true" ? "ASC" : "DESC";}
    }
    req.filter = filterObj;
    req.order = orderObj;

    next();
};

export default cursosFindAllTransform;
