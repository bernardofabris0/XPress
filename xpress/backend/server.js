const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

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

app.post('/upload', upload.fields([{ name: 'video' }, { name: 'thumbnail' }]), (req, res) => {
  const videoFile = req.files['video'][0];
  const thumbnailFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;

  if (!thumbnailFile) {
    const thumbnailPath = `uploads/${Date.now()}-thumbnail.png`;
    ffmpeg(videoFile.path)
      .screenshots({
        timestamps: ['00:00:01.000'],
        filename: path.basename(thumbnailPath),
        folder: 'uploads',
        size: '320x240',
      })
      .on('end', () => {
        res.json({ filePath: `http://localhost:${port}/${videoFile.filename}`, thumbnailPath: `http://localhost:${port}/${path.basename(thumbnailPath)}` });
      })
      .on('error', (err) => {
        console.error('Error generating thumbnail:', err);
        res.status(500).json({ error: 'Failed to generate thumbnail' });
      });
  } else {
    res.json({ filePath: `http://localhost:${port}/${videoFile.filename}`, thumbnailPath: `http://localhost:${port}/${thumbnailFile.filename}` });
  }
});

app.get('/videos', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to list videos' });
    }
    const videos = files.filter(file => file.endsWith('.mp4')).map(file => ({
      filePath: `http://localhost:${port}/${file}`,
      thumbnailPath: `http://localhost:${port}/${file.replace('.mp4', '-thumbnail.png')}`,
      title: file,
    }));
    res.json(videos);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});