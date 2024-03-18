const expressSession = require('express-session');
const flash = require('connect-flash');

// Configuración de sesiones
const sessionConfig = {
  secret: 'keyboard cat', // Reemplaza con una clave secreta más segura
  resave: false,
  saveUninitialized: false,
};

// Middleware de autenticación
const auth = (req, res, next) => {
  if (req.session && req.session.usuario) {
    next(); 
  } else {
    req.session.flash = {
      type: 'error',
      message: 'Necesitas iniciar sesión para acceder a esta página.',
    };
    res.redirect('/login'); 
  }
};

module.exports = (app) => {
  // Agregar middlewares de sesiones y flash a Express.js:
  app.use(expressSession(sessionConfig)); 
  app.use(flash()); 

  // Agregar el middleware de autenticación:
  app.use(auth);
}