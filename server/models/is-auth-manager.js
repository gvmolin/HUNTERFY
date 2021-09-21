module.exports = (req, res, next) => {
    if (req.session.isAuthManager == true) {
      next();
    } else {
      req.session.error = "You have to Login first";
      console.log('nao logado!')
      res.redirect("/login");
    }
  };