const multer = require('multer');

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: (req, filename, cb) => {
      cb(null, 'tmp');
    },
    filename: (req, filename, cb) => {
      const { _id: id } = req.current;
      cb(null, `${id}.jpg`);
    },
  });

  return multer({ storage }).single('avatar');
};

module.exports = { avatarUploader: avatarUploader() };
