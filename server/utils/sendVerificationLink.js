let nodemailer = require("nodemailer"),
  transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "yvesisite@gmail.com",
      pass: process.env.EMKEY,
    },
  });
require("dotenv").config();
function sendCode(emailTo, uid, code, codehash, res) {
  let link = `https://yvesisite.netlify.app/em-confirm/${uid}/${codehash}`,
    mailOpts = {
      from: "yvesisite@gmail.com",
      to: `${emailTo}`,
      subject: "Yves Isite Portfolio | Confirm your email",
      html: `
<div style="width: 500px;padding: 10px 0 20px 0;background: #e6e5e5;margin: auto;">
    <h2 style="text-align: center;color: #092a37;">Yves Isite Portfolio</h2>
    <div style="background: #fff;margin: 20px 40px;padding: 1px 20px 25px 20px !important;">
        <h3 style="text-align: center;margin: 10px auto;color: #092a37;">Confirm your email</h3>
        <div style="height: 3px;width: 300px;background-color: #092a37;margin: auto;"></div>
        <p style="margin: 13px 0 0 0;text-align: center;">Here is your email confirmation code:</p>
        <h3 style="margin: 8px auto;text-align: center;">${code}</h3>
        <p style="margin: 13px auto 0 auto;text-align: center;width: 70%;">You can also use this link. Just click on
            it to
            confirm.
        </p>
        <div style="text-align: center;margin-top: 20px;">
            <a style="text-decoration: none;font-weight: 500;color: #fff;border: 0;padding: 9px 18px;background: dodgerblue;font-size: 14px;"
                href="${link}">
                Click here</a>
        </div>
    </div>
</div>`,
    };
  transport.sendMail(mailOpts, (err, info) => {
    if (err) res.send({ errFound: err, pswd: process.env.EMKEY });
    else res.send({ status: "success", pswd: process.env.EMKEY });
  });
}

module.exports = sendCode;