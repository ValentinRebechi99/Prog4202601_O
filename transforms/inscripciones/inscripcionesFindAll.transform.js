const estudiantesFindAllTransform = (req, res, next) => {
    req.limit = req.query.limit ? Number(req.query.limit) : 0;
    req.offset = req.query.offset ? Number(req.query.offset) : 0;

    const filterObj = {};
    const orderObj = {};

    const { 
            idInscripcion,
            idCurso,
            idEstudiante,
            fechaHoraInscripcion,
            idInscripcionEstado, 
            order,
            limit,
            offset,
            asc
            } = req.query;

    if (limit) req.limit = limit;
    if (offset) req.offset = offset;
    if (idInscripcion) filterObj.idInscripcion = parseInt(idInscripcion);
    if (idCurso) filterObj.idCurso = parseInt(idCurso);
    if (idEstudiante) filterObj.idEstudiante = parseInt(idEstudiante);
    if (fechaHoraInscripcion) filterObj.fechaHoraInscripcion = fechaHoraInscripcion;
    if (idInscripcionEstado) filterObj.idInscripcionEstado = parseInt(idInscripcionEstado);
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

export default estudiantesFindAllTransform;
