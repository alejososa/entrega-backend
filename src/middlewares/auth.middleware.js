export function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === "ADMIN") {
        next();
    } else {
        res.status(400).json({error: "Autorización para ADMIN rechazada"})
    }
};

export function isUser(req, res, next) {
    if (req.session.user && req.session.user.role === "usuario") {
        next();
    } else {
        res.status(400).json({error: "Autorización para usuario rechazada"})
    }
};