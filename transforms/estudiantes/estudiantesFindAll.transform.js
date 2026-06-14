const estudiantesFindAllTransform = (req, res, next) => {
    req.limit = req.query.limit ? Number(req.query.limit) : 0;
    req.offset = req.query.offset ? Number(req.query.offset) : 0;

    const filterObj = {};
    const orderObj = {};

    const { 
            idEstudiante,
            documento,
            apellido,
            nombres,
            email, 
            order,
            limit,
            offset,
            asc
            } = req.query;

    if (limit) req.limit = limit;
    if (offset) req.offset = offset;
    if (idEstudiante) filterObj.idEstudiante = parseInt(idEstudiante);
    if (documento) filterObj.documento = documento;
    if (apellido) filterObj.apellido = apellido;
    if (nombres) filterObj.nombres = nombres;
    if (email) filterObj.email = email;
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
