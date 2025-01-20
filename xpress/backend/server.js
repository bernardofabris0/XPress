const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('video'), (req, res) => {
  res.json({ filePath: `http://localhost:${port}/${req.file.filename}` });
});

app.get('/videos', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to list videos' });
    }
    const videos = files.map(file => ({
      filePath: `http://localhost:${port}/${file}`,
      title: file,
    }));
    res.json(videos);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});