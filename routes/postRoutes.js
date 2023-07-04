require("dotenv").config();
const express = require("express");
const multer = require('multer');

const cloudinary = require('cloudinary').v2;
const Post = require("../database/models/post")

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});


router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });






router.route('/').post(upload.single('photo'), async (req, res) => {
  try {
    const { name, prompt } = req.body;
    const fileBuffer = req.file.buffer;

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'Posting Images' },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      const fileReadableStream = require('stream').Readable.from(fileBuffer);
      fileReadableStream.pipe(uploadStream);
    });
    console.log(uploadResult)

    const newPost = await Post.create({
      name: name,
      prompt: prompt,
      photo: uploadResult.secure_url,
    });

    if (newPost) {
      res.status(200).json({ success: true, data: newPost });
    } else {
      res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});




module.exports = router;
