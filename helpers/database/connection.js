const mongoose = require('mongoose');


const connectMongooseDb = ()=>{

    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    
    })
    .then(()=>{
        console.log("Bağlantı başarılı")
    }).catch(err=>{

        console.error(err);
    });

}

module.exports = {
    
    connectMongooseDb

}