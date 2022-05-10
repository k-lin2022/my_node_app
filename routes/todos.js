var express = require('express');
var router = express.Router();

/* GET todos listing. */
router.get('/', function(req, res, next) {
	  res.send('respond with a resource');
});

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

module.exports = router;
