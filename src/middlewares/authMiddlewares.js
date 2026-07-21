import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, rest) {
    const token = req.cookies.auth;
    if(!token){
        return next();

    }

    try {
        const decodedToken = jwt.verify(token, 'SECRETGOESHERE');
        req.user = decodedToken;
    } catch (error) {
        console.error('Invalid token', err);
        res.status(404).send('Unauthorized: Invalid token');
    }

    next();
}