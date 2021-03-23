const User = require('../models/mongoose/user');
const AsyncErrorHandler = require("express-async-handler");
const {SendJwtToClient} = require("../helpers/authentication/JwtHelpers");
const {ClearCookie} = require("../helpers/authentication/ClearCookie");
const CustomErrorMessage = require('../helpers/errors/CustomErrorMessage');
const {ValidatePassword} = require('../helpers/authentication/ValidatePassword');
const {SendMail} = require('../helpers/Libraries/SendMail');
const {GetTodayTime} = require('../helpers/authentication/GetTodayTime');

const register = AsyncErrorHandler (async (req, res, next) =>{

      const user = await User.create({
       
        UserName:req.body.UserName,
        Password:req.body.Password,
        EMail:req.body.EMail,
    })
   return SendJwtToClient(user,res);
});


const login = AsyncErrorHandler (async (req, res, next) =>{

    if(!req.body.UserName || !req.body.Password){
      return next(new CustomErrorMessage("Şifre veya kullanıcı bilgisi girmediniz...",400));
    }
    const user = await User.findOne(req.EMail).select("+Password");
    if(!ValidatePassword(req.body.Password,user.Password)){
        return next(new CustomErrorMessage("Giriş bilgileri hatalı",400));
    }
    return SendJwtToClient(user,res);

});

const profile =(req, res, next) =>{

    res.json({

        success: true,
        message: req.user

    })

}

const logout= AsyncErrorHandler (async (req, res, next) =>{

    return ClearCookie(res);

});


const forgot= AsyncErrorHandler (async (req, res, next) =>{

    const EMail = req.body.EMail;

    if(!EMail){
       return next(new CustomErrorMessage("E-mail boş Olamaz!",400));
    }
    const user =await User.findOne({
        EMail : EMail
    });

    if(!user){
       return next(new CustomErrorMessage("Böyle bir email bulunmamaktadır...",400));
    }

    const UserResetPasswordToken = user.UserResetPasswordToken();

    await user.save();

    const ResetPasswordUrl = `${process.env.WEB_URL}${process.env.PORT}/api/auth/reset?resetpasswordtoken=${user.ResetPassToken}`
    const MailBody = `<h1> Reset Password mail</h1>
                      <p> This  <a href= '${ResetPasswordUrl}'>Reset Password</a> will be expire will one hour </p>`;

        try{
            
            await SendMail({
                from: process.env.SMTP_USER,
                to: EMail,
                subject: "Reset your password",
                html:MailBody
            });

            return res.json({
                success: true,
                message: "User reset password sent successfully",
            });
        }
        catch(err){
            user.ResetPassToken=undefined;
            user.ResetPassExpire=undefined;
            await user.save();

            next(new CustomErrorMessage("Internal Server Error",500))
        }

    

});

const reset= AsyncErrorHandler (async (req, res, next) => {

    const {resetpasswordtoken}=req.query;
    const Password= req.body.Password;
    
    if(!resetpasswordtoken){
        return next(new CustomErrorMessage("Geçerli bir token bilgisi yoktur.",400));
    }
    const user = await User.findOne({
        ResetPassToken:resetpasswordtoken,
        ResetPassExpire:{$gt: GetTodayTime()}
    });

    if(!user){
        return next(new CustomErrorMessage("Token geçerli değil.",400));
    }

    user.Password=Password;
    user.ResetPassToken=undefined;
    user.ResetPassExpire=undefined;
    await user.save();

    return res.status(200).json({
        success: true,
        body: "Şifre sıfırlama başarılı bir şekilde gerçekleşti..."
    });

});


module.exports ={
    register,
    login,
    profile,
    logout,
    forgot,
    reset
}