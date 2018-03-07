const nano = require('nano')('http://localhost:5984/');


module.exports = (app) => {

  let api = {};
  let links = nano.db.use('links');

  api.uploadImage = (req, res) => {
    console.log(`\n Imagem Salva com Sucesso: \n\n ${JSON.stringify(req.file)}`);
    res.json(req.file.path);
  }


  api.list = (req, res) => {

    links.list({ include_docs: true }, (err, body) => {

      if(err){
        console.log(err.message);
        res.status(500).json(err);
      }

      let links = [];

      body.rows.forEach( (body) => {

        links.push(body.doc);
      });

      console.log('Consulta realizada', links);

      res.status(200).json(links);

    });
  }

  return api;
}
