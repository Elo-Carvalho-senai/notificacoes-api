const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const nomeUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extensao = path.extname(file.originalname);
    cb(null, nomeUnico + extensao);
  },
});

const upload = multer({ storage });

module.exports = upload;