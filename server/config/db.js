var db = require('mongoose');
db.connect('mongodb://notely:notely@ds053194.mongolab.com:53194/notely');


module.exports = db;
