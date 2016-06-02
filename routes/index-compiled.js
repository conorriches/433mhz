var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/manage/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/manage/:channel/:switch/', function (req, res, next) {
  res.send({ "tes": "t" });
});

module.exports = router;

//# sourceMappingURL=index-compiled.js.map