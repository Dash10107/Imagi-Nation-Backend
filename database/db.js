const mongoose = require("mongoose");

module.exports = async()=>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    }
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB,connectionParams);
        console.log("Connected to database successfully  ");
    } catch(error){
        console.log("could not connect to database ",error);
    }
}