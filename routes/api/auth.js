const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const express = require("express");
const router = express.Router();

const log4js = require('log4js');
const logger = log4js.getLogger();
// logger.level = 'info';
// log4js.configure({
//   appenders:{fileAppender:{type:'file', filename: __dirname + '/trackr-client/public/Logs/my.log2'}},
//   categories:{default:{appenders:['fileAppender'],level:'info'}}
// });

router.post("/", (req, res) => {
  console.log("in post");
  const { code, password, token} = req.body;
  // console.log(req.body);

  logger.error("Code:"+code);
  logger.error("Password:"+password);
  console.log("Codexx:"+code);
  console.log("Passwordxx:"+password);

  if (token) {
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded;

      User.findById(req.user.id)
        .then((user) => {
          console.log("token check");
          console.log(code);
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              console.log("auto login");
              res.json({
                token,
                msg: "Profile authenticated successfully",
                user,
                // user : {
                //     id : user.id,
                //     name : user.name,
                //     email : user.email
                // },
                success: true,
              });
            }
          );
        })
        .catch((err) => {
          return res.json({ msg: "User not found", success: false });
        });
    } catch (e) {
      return res.json({ msg: "Token not valid", success: false });
    }
  } else {
    // Simple validation
    if (!code || !password) {
      res.json({ success: false, msg: "Please enter all the data" });
    }
    // Check user
    User.findOne({ usr_code: code })
      .then((user) => {
        console.log("in finduser");
        if (!user) {
          return res.json({ msg: "User Does not exist", success: false });
        }
//
if(user.usr_active === false)
{
  return res.json({ msg: "User not active", success: false });
}



        // Validate password
        bcrypt.compare(password, user.usr_password).then((isMatch) => {
          if (!isMatch) {
            return res.json({ msg: "Invalid Credentials", success: false });
          }

          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token,
                user,
              });
            }
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
