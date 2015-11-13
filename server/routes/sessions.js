var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/', (req, res) => {
  User.findOne({
    username: req.body.user.username
  }).then((user) => {
    if (user) {
      user.authenticate(req.body.user.password, (isMatch) => {
        if (!isMatch) {
          res.json({ message: 'could not authenticate'});
        } else {
          var token = jwt.sign(user._id, process.env.JWT_SECRET, { expiresIn: 24*60*60 });
          res.json({
            message: 'signing in',
            user: user,
            auth_token: token
          });
        }
      });
    } else {
      res.json({ message: 'could not authenticate'});
    }
  }, (err) => {
    res.json(err);
  });
});

module.exports = router;
