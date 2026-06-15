import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import UsuariosService from '../services/usuarios.service.js';

// funcion extra para obtener el token de la cookie si no hay auth-header
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['auth_token'];
    }
    return token;
};

const localStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async (username, password, done) => {
        try {
            const service = new UsuariosService();
            const user = await service.find(username, password);
            if (!user) {
                return done(null, false, { message: 'Nombre de usuario y/o contraseña incorrectos.' });
            } else {
                return done(null, user, { message: 'Login correcto!' });
            }
        } catch (exc) {
            done(exc);
        }
    }
);

const jwtStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(),cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET
},
    async (jwtPayload, done) => {
        const service = new UsuariosService();
        const user = await service.findById(jwtPayload.userId);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Token incorrecto.' });
        }
    }
);

export { localStrategy, jwtStrategy };