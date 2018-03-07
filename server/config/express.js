 const express = require('express'),
       app = require('express')(),
       consign = require('consign'),
       bodyParser = require('body-parser');


module.exports = () => {
  /* Middlewares */
  app.use(bodyParser.json());
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
  });
  /* Middlewares */

  consign({cwd: 'server'})
    .include('api')
    .then('routes')
    .into(app);

  return app;
}
