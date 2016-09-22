var app = require('express').Router();
app.get('/checklogin', function(req, res) {
	var sess = req.session;
	if(sess.correo) {
		return res.json({exito:true});
	}
	res.json({exito:false,correos:['@alumnos.usm.cl','@sansano.usm.cl']});
});

// route to handle creating goes here (app.post)
app.post('/signup', function(req,res) {
	if(!req.body.correo || !req.body.dominio || !req.body.rol || !req.body.password) {
		res.json({exito:false,mensaje:'Introducir correo, rol y contrasena'});
	} 
	else {
		var Regex = require('regex');
		var test_rol = new Regex(/^\d*\-[k|K|\d]$/);
		var test_correo = new Regex(/^[a-z]*\.[a-z]*(?:\.[1-9]\d)?$/);
		var mail= req.body.correo+req.body.dominio;
		if(test_correo.test(mail) || test_rol.test(req.body.rol)) {
			delete test_rol;
			delete test_correo;
			res.json({exito:false,mensaje:'Uno de los campos está incorrecto'});
		}
		else {
			delete test_rol;
			delete test_correo;
			var usuario = require('./modelos/usuario');
			usuario.crear(mail,req.body.password,req.body.rol, function(error,resultado) {
				if(error) {
					return res.json({exito:false,mensaje:'Usuario ya existente'});
				}
				res.json({exito:true,mensaje:'Usuario registrado'});
			});
		}
	}
});

app.post('/autenticacion', function(req,res) {
	var usuario = require('./modelos/usuario');
	var mail= req.body.correo+req.body.dominio;
	usuario.ver(mail, req.body.password, function(error, usuario) {
		if(error) {
			return res.json({exito:false,mensaje:'Algo salio mal'});
		}
		
		if(usuario===false) {
			return res.json({exito:false,mensaje:'Usuario o contraseña incorrecto'});
		}
		else {
			var sess = req.session;
			sess.correo = mail;
			sess.cookie.expires = new Date(Date.now()+86400000);
			res.json({exito:true});
		}
	});
});

app.get('/logout', function(req,res) {
	req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});
});

module.exports = app;
