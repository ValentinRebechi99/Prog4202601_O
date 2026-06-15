import jwt from 'jsonwebtoken';
import passport from "passport";

class AuthController {

    login = async (req, res) => {
        passport.authenticate('local', { session: false }, 
            (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Solicitud incorrecta',
                    user
                });
            }

            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
                const payload = { 
                    userId: user.userid,
                    username: user.username,
                    name: user.nombre,
                    surname: user.apellido
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ token });
            });
        })(req, res);
    };

    checkSession = (req, res) => {
        if (req.user) {
            return res.status(200).json({
                authenticated: true,
                message: 'Sesión activa',
                user: {
                    id: req.user.id,
                    username: req.user.username
                }
            });
        }
        return res.status(401).json({ 
            authenticated: false, 
            message: 'No autorizado' 
        });
    };

}

export default AuthController;