require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

const configuration = new Configuration({
    // organization:process.env.OPENAI_API_ORG,
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);

  router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
  });

  router.route('/').post(async (req, res) => {
    try {
        
      const { prompt } = req.body;
        
      const aiResponse = await openai.createImage({
        prompt:"A cat and dog",
        n: 1,
        size: '256x256',
      });

      const image = aiResponse.data.data[0].url;
      res.status(200).json({ success:true,photo: image });
    } catch (error) {
        if(error.response){
            console.log(error.response.status);
            console.log(error.response.data);
        }else{
        console.error(error.message);
        }
      res.status(400).json({
        success: false,
        message: 'Unable to generate image, please try again',
      });
    }
  });

    module.exports = router;