

function checkLogin(req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
  }
  
  function checkLogged(req, res, next) {
    if (req.session.user) return res.redirect("/");
    next();
  }

  const authorizeUser = (roles) => (req, res, next) => {
    const userRole = req.session.user.rol;
    console.log(userRole)
   
    if (roles.includes(userRole)) {

      next();
    } else {
      
      res.status(403).json({ error: "No tienes permiso para acceder a este recurso" });
    }
  };
  
  export { checkLogged, checkLogin, authorizeUser };
  