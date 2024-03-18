const expressSession = require('express-session');
const flash = require('connect-flash');

// Configuración de sesiones
const sessionConfig = {
  secret: 'perrito', 
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
  
  app.use(expressSession(sessionConfig)); 
  app.use(flash()); 
  app.use(auth);
}