'use strict'
let jwt = require('jsonwebtoken');
let User = require('../models/user');

module.exports = ( req, res, next ) => {
  let authToken = req.headers.authorization;
  let isLoggingInOrRegistering = !!req.body.user;

  if (authToken && !isLoggingInOrRegistering) {
    // decode user id from jwt token and find user
    jwt.verify(authToken, process.env.JWT_SECRET, (err, decodedId) => {
      if (decodedId) {
        // add user to request
        User.findOne({ _id: decodedId }).then((user) => {
            req['user'] = user;
            next();
        });
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    next();
  }

};
