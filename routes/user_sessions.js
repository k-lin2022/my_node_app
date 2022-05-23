var express = require('express');
var router = express.Router();
const getDbConnection = require('../lib/db_connection');

/* POST create session. */
router.post('/', function(req, res, next) {
  const name = req.body.name;
  const password = req.body.password;
  const connection = getDbConnection();
  connection.connect();

  const query = 'SELECT * FROM `users` WHERE `name` = ? AND `password` = ?';
  connection.query(query,
    [name, password],
    (err, rows, fields) => {
      if (err) throw err;

    req.session.name = rows[0].name;
    console.log(`user ${rows[0].name} logged in.`);
    res.redirect('/todos/new');
  });

  connection.end();
});

/* GET login page. */
router.get('/new', function(req, res, next) {
  res.render('user_sessions/new');
});

module.exports = router;
