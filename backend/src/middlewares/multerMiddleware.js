
import multer from 'multer';
import path from 'path';

// Seting the  storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set unique filename
  },
});

// Initialize multer upload to handle multiple fields
const upload = multer({ storage: storage }).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]);

// Middleware function to handle image upload
const uploadImages = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
    console.log('Images uploaded successfully');
    next(); // Proceed to the next middleware
  });
};

export default uploadImages;
