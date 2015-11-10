var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header('access-control-allow-origin', '*');
  next();
});

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
