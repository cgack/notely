require('dotenv').load();
var express = require('express');
var app = express();
var Note = require('./models/note');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/add_user_to_request'));


app.use('/api/v1/notes', require('./routes/notes'));
app.use('/api/v1/users', require('./routes/users'));


app.listen(3000, function() {
    console.log('listening http://localhost:3000...');
});
