/*     焦飞听得喜到心翻，暗道一声：“正愁不知如何接近青帝门下，没想到就有机会！明天定要好生表现一番。” */



/* const nodemailer = require('nodemailer');

const sendQuoteEmail = async (to, subject, text, attachments) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'techctlaustralia@gmail.com',
      pass: 'CTLadmin007',
    },
  });

 */

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
   });

   transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
   });
   