const upload = require('../config/storage');


module.exports = function(app) {

  let api = app.api.links;

  app.get('/v1/links', api.list);

  app.post('/uploadImage', upload.single('image'), api.uploadImage);

};
