var express = require('express');
var router = express.Router();
const getDbConnection = require('../lib/db_connection');

/* GET todos listing. */
router.get('/', function(req, res, next) {
	  const connection = getDbConnection();

	  connection.connect();
	  
	  connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
		      if (err) throw err;
		    
		      res.send(`The solution is: ${rows[0].solution}`);
		    })
	  
	  connection.end();
});

/* POST create todo. */
router.post('/', function(req, res, next) {
	  const title = req.body.title;
	  const content = req.body.content;
	  const connection = getDbConnection();

	  connection.connect();

	  const query = 'INSERT INTO `todos` (`title`, `content`, `created_at`, `updated_at`)' + 
		    'VALUES (?, ?, SYSDATE(), SYSDATE())';
	  connection.query(query,
		      [title, content],
		      (err, rows, fields) => {
			            if (err) throw err;

                  req.session.message = `A new resource was created: ${title} ${content}.`;

			            res.redirect('/todos/new');
			        });

	  connection.end();
});

/* GET show todo. */
router.get('/:id(\\d+)', function(req, res, next) {
    const connection = getDbConnection();

	  connection.connect();

	  const query = 'SELECT * FROM `todos` WHERE id = ?';
	  connection.query(query,
		      [req.params.id],
		      (err, rows, fields) => {
			            if (err) throw err;

                  res.render('todos/show', {
                      title: rows[0].title,
                      content: rows[0].content
                  });
			        });

	  connection.end();
});

/* GET new todo. */
router.get('/new', function(req, res, next) {
    let message;

    if (req.session.message) {
      message = req.session.message;
      req.session.message = null;
    }

    res.render('todos/new', { message: message });
});

module.exports = router;
