const CustomErrorMessage = require('../../helpers/errors/CustomErrorMessage')

const CustomErrorHandler = (err,req,res,next) => {

    let CustomError=err;

    if(err.name==="SyntaxError"){
        CustomError= new CustomErrorMessage(err.message,400);
    }
    if(err.name==="ValidationError"){
        CustomError= new CustomErrorMessage(err.message,400);
    }
    if(err.code===11000){
        CustomError= new CustomErrorMessage("Bu email zaten var!",400);

    }
    
    res.status(err.status || 500).json({
        success:false,
        message:err.message || "Internal Server Error"
    })
};

module.exports =CustomErrorHandler;