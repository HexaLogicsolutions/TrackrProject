const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const express = require("express");
const router = express.Router();

// User model
const User = require("../../models/User");

router.post("/", (req, res) => {
  const { code, name, email, password, group, active } = req.body;
  console.log("post /users");
  console.log("body : "+ req.body);
  console.log(name);
  console.log(active);

  if (!code || !name || !email || !password || !group || !active) {
    res.json({ success: false, msg: "please enter all the data" });
  }
  User.findOne({ usr_code: code }).then((user) => {
    if (user) {
      return res.json({ success: false, msg: "user already exist" });
    }

    const newUser = new User({
      usr_company: "HLS",
      usr_code: code,
      usr_name: name,
      usr_password: password,
      usr_email: email,
      usr_group: group,
      usr_active: active,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err0, hash) => {
        if (err0) throw err0;
        newUser.usr_password = hash;
        console.log(password);
        console.log(hash);

        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                msg: "Profile Created",
                token,
                user,
                // user: {
                //   id: user.id,
                //   user_company: 'HLS',
                // usr_code : usr_code,
                // usr_name : usr_name,
                // usr_email: usr_email,
                // usr_group:usr_group
                // }
              });
            }
          );
        });
      });
    });
  });
});

// Get all users
router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get user by code
router.get("/:code", (req, res) => {
  User.find({ usr_code: req.params.code })
    .then((users) => {
      if (users.length == 0) res.send("No user found");
      else res.send(users[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update api
router.put("/", (req, res) => {
  const { code, name, email, group,active } = req.body;
  console.log(name);
  console.log(active);
  
  User.findOne({ usr_code: code}).then((user) => {
    if (!user) {
      return res.json({ success: false, msg: "User does not exist" });
    }
console.log("user exists");
    User.updateOne(
     { usr_code: code },
      { $set: {
        usr_name: name,
        usr_email:email,
        usr_group:group,
        usr_active:active,
      }}
    )
    .then(resp=>{
      console.log("success");
      res.json({
        success: true,
        msg: "Profile Updated"
      });
    })
    .catch(err =>
      {
        console.log(err);
        if (err) 
        
        {throw err;}
      });   
  });
});


//delete user
router.delete('/:code', (req, res) => {

  //console.log("delete user:" + req.params.code);

  User.find({ usr_code: req.params.code })
  .then((users) => {
    if (users.length == 0) res.send(`${req.params.code} user not found`);
    else {
      const user= users[0];
      console.log(user);
      user.delete()
      .then((usr)=>{
        console.log("user deleted");
        res.send(`User ${req.params.code} deleted successfully.`)
      })
      .catch(e=>{
        console.log("error: "+e);
        throw e;
      });
    }
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });




  // User.findOneAndDelete({ usr_code: req.params.code }), 
  // (err, result) => {

  // if (err) {
  //   res.send("error:" + err);
  //   return res.send(500, err);
  // }
  // res.send("result:" + result);
  // res.send('User deleted.');
  // res.redirect('/');
  // }
});

//update api
// router.put("/:id", (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }
//   const id = req.params.id;

//   User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(User => {
//       if (!User) {
//         res.status(404).send({
//           message: `Cannot update user with id=${id}. Maybe user was not found!`
//         });
//       } else res.send({ message: "user was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating user with id=" + id
//       });
//     });
// });
//update api

  module.exports = router;
