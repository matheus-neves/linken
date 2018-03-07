multer = require('multer'),
path = require('path');


const pathUploadImages = 'server/assets/uploads/';


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathUploadImages);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
}),
upload = multer({ storage });


module.exports = upload;
