import UsuarioRepository from "../repositories/usuarios.repository.js";

class UsuariosService {

    constructor() {
        this.repository = new UsuarioRepository();
    }

    find = async (username, password) => {
        return await this.repository.find(username, password);
    };

    findById = async (userId) => {
        return await this.repository.findById(userId);
    };

}

export default UsuariosService;