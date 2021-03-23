const jwt = require('jsonwebtoken');
const CustomErrorMessage = require('../../helpers/errors/CustomErrorMessage');

const AccessTokenControl = (req,res,next)=>{

    const {SECRET_KEY}=process.env;
    jwt.verify(req.headers.authorization,SECRET_KEY,(err,decoded)=>{

        if(err) {
            return next(new CustomErrorMessage("Otomatik çıkış yapılmış veya henüz bir girişiniz bulunmamakta. Lütfen giriş yapın",401));
        }
        req.user = decoded;
        next();
    })

    next();

}

module.exports =
{
    AccessTokenControl
} 