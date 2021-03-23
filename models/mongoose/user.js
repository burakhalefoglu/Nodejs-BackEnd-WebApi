
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {GetTodayTime} = require('../../helpers/authentication/GetTodayTime');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    UserName:{
        type: 'string',
        required: true,
    },
    EMail:{
        type: 'string',
        required: true,
        unique: true,
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,"Doğru bir e mail adresi giriniz..."]
    },
    Password:{
        type: 'string',
        required: true,
        select:   false,
        minLength:[6,"Lütfen en az 6 karakter giriniz..."]
    },
    role:{
        type: 'string',
        default: 'user',
        enum: ['user', 'admin']
    },
    blocked:{
        type: 'boolean',
        default: false
    },
    ResetPassToken:{
        type: 'string',
    },
    ResetPassExpire:{
        type: Date
    },
    created:{
        type: Date,
        default: GetTodayTime()

    }
    

})

UserSchema.methods.GenerateJWT = function(){

    const payload={
        name: this.UserName,
        id: this._id
    };
    const SecretKey = process.env.SECRET_KEY;
    const expiresIn = process.env.EXPIRES;


    const token = jwt.sign(payload, SecretKey, { 
        expiresIn:expiresIn
    });

    return token;
};

UserSchema.methods.UserResetPasswordToken= function(){

    const RandomHexString = crypto.randomBytes(16).toString('hex');
    const ResPasswordToken = crypto
    .createHash("SHA256")
    .update(RandomHexString)
    .digest('hex');

    

    this.ResetPassToken=ResPasswordToken;
    this.ResetPassExpire=GetTodayTime(3600000);
};

UserSchema.pre("save",function (next) {

    if(!this.isModified("Password")) next();

    bcrypt.genSalt(10, (err, salt) =>{
        if (err) next(err);

        bcrypt.hash(this.Password, salt, (err, hash)=> {
            if (err) next(err);
            this.Password = hash;
            next();
        });
    });


});

module.exports = mongoose.model("User",UserSchema);