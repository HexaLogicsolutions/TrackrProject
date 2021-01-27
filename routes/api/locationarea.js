const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();

const LocationArea = require("../../models/LocationArea");

router.post("/", (req, res) => {
  const { code, name, active } = req.body;
  // return error if code has a value
  if (code) {
    res.json({ success: false, msg: "Invalid parameters" });
  }

  if (!name) {
    res.json({ success: false, msg: "Please enter all the data" });
  }

   LocationArea.findOne({ lar_name: name})
  .collation({ locale: 'en_US', strength: 2 })
  .then((locationarea) => {
    if (locationarea) {
      return res.json({ success: false, msg: "Name already exits" });
    }

  LocationArea.find({})
      .select("lar_code")
      .sort({ lar_code: -1 })
      .limit(1)
      .exec(function (err, doc) {
        let max_code = doc[0].lar_code;
        console.log("max :"+max_code);

        const newlocationarea = new LocationArea({
          lar_company: "HLS",
          lar_code: max_code+1,
          lar_name: name,
          lar_active: active,
        });

        newlocationarea
          .save()
          .then((data) => {
            console.log(data);
            return res.json({ success: true, msg: " location area. added" });
          })
          .catch((err) => {
            console.log(err);
            return res.json({
              success: false,
              msg: "location area name could not be saved",
            });
          });
      });

  });
});

// get all groups
router.get("/", (req, res) => {
 LocationArea.find()
    .then((locationarea) => {
      res.send(locationarea);
    })
    .catch((err) => {
      console.log(err);
    });
});





// get group by code
router.get("/:code", (req, res) => {
  console.log("code: " + req.params.code);
 LocationArea.find({ lar_code: req.params.code })
    .then((locationarea) => {
      if (locationarea.length == 0) res.send("No location found");
      else res.send(locationarea[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.delete("/:code", (req, res) => {
  LocationArea.find({ lar_code: req.params.code })
    .then((locationarea) => {
      if (locationarea.length == 0) res.send("Location  not  found");
      else {
        const locationArea = locationarea[0];
      locationArea
          .delete()
          .then((larea) => {
            console.log("group not found");
            res.send(
              `Location area code ${req.params.code} deleted successfully.`
            );
          })
          .catch((e) => {
            console.log("error: " + e);
            throw e;
          });
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

//update api
router.put("/", (req, res) => {
  const { code, name, active ,type} = req.body;

  console.log("code :"+code);
  console.log("name :"+name);
  console.log("active :"+active);

 LocationArea.findOne({lar_code: code}).then((locationarea) => {
    if (!locationarea) {
      return res.json({ success: false, msg: "location area not exist" });
    }
LocationArea.updateOne(
      { lar_code: code },
      {
        $set: {
            lar_type: type,
          lar_name: name,
          lar_active: active,
        },
      }
    )
      .then((resp) => {
        console.log("success");
        res.json({
          success: true,
          msg: "Locaiton area Updated",
        });
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          throw err;
        }
      });
  });
});

module.exports = router;
