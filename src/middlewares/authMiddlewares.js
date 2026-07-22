import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.cookies.auth;
    if(!token){
        return next();

    }

    try {
        const decodedToken = jwt.verify(token, 'SECRETGOESHERE');
        req.user = decodedToken;
    } catch (error) {
        console.error('Invalid token', error);
        return res.status(401).send('Unauthorized: Invalid token');
    }

    next();
}

export function isAuth(req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}

export function isGuest(req, res, next) {
    if(req.user) {
        return res.redirect('/');
    }

    next();
}
