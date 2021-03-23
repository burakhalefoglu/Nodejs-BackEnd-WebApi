const bcrypt = require('bcryptjs');


const ValidatePassword =(password,hashPasssword) =>{

   return bcrypt.compareSync(password,hashPasssword);

}

module.exports = {
    ValidatePassword
};
