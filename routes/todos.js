var express = require('express');
var router = express.Router();

/* POST create todo. */
router.post('/', function(req, res, next) {
	  const title = req.body.title;
	  const content = req.body.content;
	  res.send(`respond with a new resource ${title} ${content}`);
});

/* GET show todo. */
router.get('/:id', function(req, res, next) {
	  res.send(`respond with a resource id ${req.params.id}`);
});

/* GET todos listing. */
router.get('/', function(req, res, next) {
	  const mysql = require('mysql');
	  const connection = mysql.createConnection({
		      host: 'localhost',
		      user: 'my_node_app',
		      password: 'my_node_app',
		      database: 'my_node_app'
		    });
	  
	  connection.connect();
	  
	  connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
		      if (err) throw err;
		    
		      res.send(`The solution is: ${rows[0].solution}`);
		    })
	  
	  connection.end();
});

module.exports = router;
