module.exports = function(app) {

	app.get('/api/num2', function(req, res) {
		var cosas= {
			name:'miguel',
			apellido:'zamudio'
		};
		res.json(cosas); // return all nerds in JSON format
	});

	// route to handle creating goes here (app.post)
	// route to handle delete goes here (app.delete)

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html'); // load our public/index.html file
	});

};
