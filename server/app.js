var express = require('express');
var app = express();

app.get('/notes', function(req, res) {
 res.json([
   {
     title: 'sup',
     body_html: 'balkjdflasdkjf lsadfjlkj'
   },
   {
     title: 'yo',
     body_html: 'ljsdksjdflskjfsljf lkjlkj'
   },
 ]);
});

app.listen(3000, function() {
    console.log('listening http://localhost:3000...');
});
