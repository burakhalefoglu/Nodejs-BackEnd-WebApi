const ClearCookie = (res)=>{

    const NODE_ENV = process.env.NODE_ENV;

    return res.status(200).cookie("Access-Token",token,{
        httpOnly:true,
        expires: new Date(Date.now()),
        secure: NODE_ENV==="development"?false:true
    }).json({
        message:"Çıkış başarılı",
    });
}


module.exports=
{
    ClearCookie,    
};