const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine folder based on field name
    const folder = file.fieldname === 'images' ? 'uploads/images' : 'uploads/documents';
    const dest = path.join(__dirname, '..', folder);

    // Ensure the directory exists
    fs.mkdirSync(dest, { recursive: true });

    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
