


const SendJwtToClient = (user,res)=>{

    const token = user.GenerateJWT();
    const JWTTokenEXPIRES = process.env.EXPIRES;
    const NODE_ENV = process.env.NODE_ENV;
    const COOKIE_EXPIRES= process.env.COOKIE_EXPIRES;

    return res.status(200).cookie("Access-Token",token,{
        httpOnly:true,
        expires: new Date(Date.now() + parseInt(COOKIE_EXPIRES)*1000),
        secure: NODE_ENV==="development"?false:true
    }).json({
        message:"Başarılı",
        accessToken: token,
        data: {
            id: user._id,
            name: user.UserName,
            email: user.EMail,
        }
    });
}


module.exports=
{
    SendJwtToClient,    
};