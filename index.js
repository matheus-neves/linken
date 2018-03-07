const app = require('./server/config/express')();

app.listen(9000, () => {
  console.log('Listening on port 9000.');
});
