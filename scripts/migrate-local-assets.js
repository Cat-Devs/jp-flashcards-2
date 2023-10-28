const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const s3Client = new S3Client({
  endpoint: 'http://localhost:4569', // Local S3 endpoint
  forcePathStyle: true,
  credentials: {
    accessKeyId: 'S3RVER',
    secretAccessKey: 'S3RVER',
  },
});
const bucketName = process.env.BUCKET_NAME;
const assetsFolder = '_assets';

const uploadFiles = async () => {
  try {
    const files = fs.readdirSync(assetsFolder);

    for (const file of files) {
      const localFilePath = path.join(assetsFolder, file);
      const fileContent = fs.readFileSync(localFilePath);
      const params = {
        Bucket: bucketName,
        Key: file, // Use the same file name for the object key
        Body: fileContent,
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      console.log(`Uploaded: ${file}`);
    }
  } catch (err) {
    console.error('Error uploading files:', err);
  }
};

uploadFiles();
