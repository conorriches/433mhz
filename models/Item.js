var mongoose = require('mongoose'); // require the 'mongoose' module, for connecting to the mongodb.
var Schema = mongoose.Schema; //Define 'Schema' as the mongoose schema.. something.
mongoose.connect('mongodb://localhost:27017/lighting');



var itemSchema = new Schema({
    name:  String,
    channelNo: { type: Number, min: 1, max: 4 },
    switchNo: { type: Number, min: 1, max: 4 },
    type: Boolean,
    room: String,
    status: Boolean
});


module.exports = mongoose.model('Item', itemSchema);