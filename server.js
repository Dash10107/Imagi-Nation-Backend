require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connection = require("./database/db");
const cors = require("cors");
const path = require("path");
const dalleRoutes = require("./routes/dalleRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(cors());
app.use(express.json({ limit: '50mb' }));


app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Hello from DALL.E!',
    });
  });
  

  let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
  const startServer = async () => {
    try {
      connection();
      app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();