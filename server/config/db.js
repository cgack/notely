var db = require('mongoose');
// db.connect(process.env.DB_URI);
db.connect(process.env.VAGRANT_DB_URI);


module.exports = db;
