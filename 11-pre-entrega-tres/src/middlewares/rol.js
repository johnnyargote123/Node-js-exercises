function updateUserRoleMiddleware (req, res, next) {
    const { email } = req.body;
    if (email !== 'adminCoder@coder.com') {
      req.body.rol = 'usuario';
    }
    next();
  };
  
  export default updateUserRoleMiddleware;