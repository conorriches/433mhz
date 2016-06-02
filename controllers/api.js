

var Item = require('../models/Item.js');



/**
 * GET ALL
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    Item.find(function(err, items) {
        res.send(items);
    });
};


/**
 * Changes the state
 * @param req
 * @param res
 * @param callback
 */
exports.switch = function(req, res, callback){

    var status = req.body.status?true:false;

    //get the item
    Item.update(
        {
            channelNo: req.params.channelNo,
            switchNo: req.params.switchNo
        },
        {
            status:status
        },
        { upsert: true },function(err,count,status){
            callback(status);
        }
    );
};


/**
 * POST NEW
 * @param req
 * @param res
 * @param callback
 */
exports.newItem = function(req, res, callback) {

    var newItem = new Item({
        name: req.body.name,
        channelNo:req.body.channelNo,
        switchNo:req.body.switchNo,
        type:false,
        status:false
    });

    newItem.save(function (err, item) {
        if (err) {
            callback({status:0});
        } else {
            callback({
                status:1,
                data:item
            });
        }
    });

};


exports.updateItem = function(req, res, callback) {

    var obj = req.body.obj;

    Item.update(
        {
            _id:obj._id
        },
        {
            name: obj.name,
            channelNo: obj.channelNo,
            switchNo: obj.switchNo
        },
        { upsert: true },function(err,count,status){
            callback(status);
        }
    );

};


exports.deleteItem = function(req, res, callback) {

    Item.remove({_id:req.body.id},function (err, item) {
        if (err) {
            callback({status:0});
        } else {
            callback({
                status:1
            });
        }
    });

};

