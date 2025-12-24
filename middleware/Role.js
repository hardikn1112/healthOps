module.exports = function role(req,res,next) {
    if(req.user.role !== 'doctor') return res.status(403).send('Forbidden Access');
    next();
}