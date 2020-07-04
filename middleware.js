export const destroySession = (req, res, next) => {
    req.session.destroy();
    return next();
}