var express = require('express');
var router = express.Router();
var api = require('../controllers/api.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/api/item/new', function(req, res, next) {

    api.newItem(req,res,function(response){
        res.send(response)
    });

});

router.post('/api/item/update', function(req, res, next) {

    api.updateItem(req,res,function(response){
        res.send(response)
    });

});


router.post('/api/item/delete', function(req, res, next) {

    api.deleteItem(req,res,function(response){
        res.send(response)
    });

});


router.post('/api/switch/:channelNo/:switchNo', function(req, res, next) {

    api.switch(req,res,function(response){
        res.send(response)
    });

});


router.get('/api/list', function(req, res, next) {

    api.list(req,res,function(response){
        res.send(response)
    });

});



router.post('/api/update/:id/', function(req, res, next) {

    var channelNo = req.params.channel,
        switchNo = req.params.switch,
        name = req.body.name;
   res.send({
       "channel":channelNo,
       "switch":switchNo,
       "name":name,
       "list":api.list()
   });

});

module.exports = router;
