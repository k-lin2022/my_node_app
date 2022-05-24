var express = require('express');
var router = express.Router();
const getDbConnection = require('../lib/db_connection');

/* Deny not logged in users */
router.use((req, res, next) => {
  if (req.session && req.session.name) {
    console.log('logged in user has come.');
    next();
  }
  else {
    console.log('NOT logged in user has come.');
    res.sendStatus(401);
  }
})

/* GET todos listing. */
router.get('/', function(req, res, next) {
  const connection = getDbConnection();
  connection.connect();

  const fromDate = new Date(req.query.fromDate);
  const toDate = new Date(req.query.toDate);

  const query = 'SELECT * FROM `todos` WHERE ? <= `created_at` AND `updated_at` < ?';
  const q = connection.query(query,
    [fromDate, toDate],
    (err, rows, fields) => {
    if (err) throw err;

    res.render('todos/index', { todos: rows });
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
