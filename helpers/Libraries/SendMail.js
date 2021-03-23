const nodemailer = require('nodemailer');

const SendMail = async mailOptions => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER, // generated ethereal user
          pass: process.env.SMTP_PASS, // generated ethereal password
        },
        
      });
      // send mail with defined transport object
      const info = await transporter.sendMail(mailOptions);

}
module.exports = {
    SendMail
};
//SendMail().catch(console.error);