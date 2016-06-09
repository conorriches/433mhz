var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db');
// or more concisely
var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }


/**
 * GET ALL
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    db.all("SELECT * FROM ITEMS", function(err, row) {
        res.send(row)
    });
};


/**
 * Changes the state
 * @param req
 * @param res
 * @param callback
 */
exports.switch = function(req, res, callback){
    var status = req.body.status?1:0;

    db.run(
        "UPDATE items SET status = ? WHERE channelNo = ? AND switchNo = ?",
        [status, req.params.channelNo, req.params.switchNo],
        function(){
            exec("sudo send " + req.params.channelNo + " " + req.params.switchNo + " " + status, puts);
            callback({status:1});
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

    db.run(
        "INSERT INTO items (name, status, channelNo, switchNo) VALUES (?,?,?,?)",
        [
            req.body.obj.name,
            0,
            req.body.obj.channelNo,
            req.body.obj.switchNo
        ],
        function(){
            callback({status:1});
        }
    );

};


exports.updateItem = function(req, res, callback) {

    db.run(
        "UPDATE items SET name = ?, channelNo=?, switchNo = ? WHERE ID = ?",
        [
            req.body.obj.name,
            req.body.obj.channelNo,
            req.body.obj.switchNo,
            req.body.obj.id
        ],
        function(){
            callback({status:1});
        }
    );


};


exports.deleteItem = function(req, res, callback) {

    db.run(
        "DELETE FROM items WHERE ID = ?",
        [
            req.body.obj.id
        ],
        function(){
            callback({status:1});
        }
    );


};

