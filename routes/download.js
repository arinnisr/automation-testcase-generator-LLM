import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const downloadFile = (res, filePath, fileName) => {
  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(`Error downloading ${fileName}:`, err);
        res.status(500).json({ error: `Failed to download ${fileName}` });
      }
    });
  } else {
    res.status(404).json({ error: `${fileName} not found` });
  }
};

router.get('/test-case', (req, res) => {
  const filePath = path.resolve('test-case.csv');
  downloadFile(res, filePath, 'test-case.csv');
});

router.get('/test-script', (req, res) => {
  const filePath = path.resolve('test-script.cy.js');
  downloadFile(res, filePath, 'test-script.js');
});

export default router;
