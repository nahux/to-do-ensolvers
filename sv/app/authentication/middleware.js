
//Encargado de chequear que el usuario tenga las cookies correctas
//En caso de que las tenga se llama al siguiente middleware, sino al login

function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}