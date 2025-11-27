const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const { google } = require('googleapis');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const fs = require('fs');
const path = require('path');



dotenv.config();

connectDB();

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors());


app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Auth API is running');
});


const upload = multer({ dest: 'uploads/' });

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  try {
    const driveService = google.drive({ version: 'v3', auth: await auth.getClient() });

    const fileMetaData = {
      name: fileName,
      parents: ['1Ex_zKgMdxpQobpRlw9BIFmhdTP7fi5h6'], // <-- Replace this with your actual Google Drive folder ID
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(filePath),
    };

    const response = await driveService.files.create({
      requestBody: fileMetaData,
      media: media,
      fields: 'id',
    });

    const fileId = response.data.id; // <-- Fix: this was previously `fieldId`

    await driveService.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const fileLink = `https://drive.google.com/uc?id=${fileId}&export=download`;

    fs.unlinkSync(filePath); // Clean up uploaded file from server

    res.json({ fileLink });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file to Google Drive');
  }
});

app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
});
