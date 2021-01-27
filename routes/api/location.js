const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();

const Location = require("../../models/Location");

router.post("/", (req, res) => {
  const { code, name, enable,area } = req.body;
  // return error if code has a value
  if (code) {
    res.json({ success: false, msg: "Invalid parameters" });
  }

  if (!name) {
    res.json({ success: false, msg: "Please enter all the data" });
  }

   Location.findOne({ loc_name: name})
  .collation({ locale: 'en_US', strength: 2 })
  .then((location) => {
    if (location) {
      return res.json({ success: false, msg: "Name already exits" });
    }

    Location.find({})
      .select("loc_code")
      .sort({ loc_code: -1 })
      .limit(1)
      .exec(function (err, doc) {
        let max_code = doc[0].loc_code;
        console.log("max :"+max_code);

        const newLocation = new Location({
          loc_company: "HLS",
          loc_code: max_code+1,
          loc_area: area,
          loc_name: name,
          loc_enable: enable,
        });

        newLocation
          .save()
          .then((data) => {
            console.log(data);
            return res.json({ success: true, msg: "  Location added" });
          })
          .catch((err) => {
            console.log(err);
            return res.json({
              success: false,
              msg: "Location name could not be saved",
            });
          });
      });

  });
});

// get all locations
router.get("/", (req, res) => {
  Location.find()
    .then((location) => {
      res.send(location);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get locations by code
router.get("/:code", (req, res) => {
  console.log("code: " + req.params.code);
  Location.find({ loc_code: req.params.code })
    .then((location) => {
      if (location.length == 0) res.send("No Location found");
      else res.send(location[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});


// get locations by area
router.get("/area/:code", (req, res) => {
  console.log("area: " + req.params.code);
  Location.find({ loc_area: req.params.code })
    .then((location) => {
      if (location.length == 0) res.send("No locations found");
      else res.send(location[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.delete("/:code", (req, res) => {
  Location.find({ loc_code: req.params.code })
    .then((Location) => {
      if (Location.length == 0) res.send("entity sub type not  found");
      else {
        const location = Location[0];
      location
          .delete()
          .then((etsub) => {
            console.log("group not found");
            res.send(
              `Entity sub type code ${req.params.code} deleted successfully.`
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
  const { code, name, enable ,type,area} = req.body;

  console.log("code :"+code);
  console.log("name :"+name);
  // console.log("enable :"+enable);

  Location.findOne({ loc_code: code }).then((location) => {
    if (!location) {
      return res.json({ success: false, msg: "Location not exist" });
    }

    Location.updateOne(
      { loc_code: code },
      {
        $set: {
            loc_type: type,
            loc_area: area,
          loc_name: name,
          loc_enable: enable,
        },
      }
    )
      .then((resp) => {
        console.log("success");
        res.json({
          success: true,
          msg: " Location Updated",
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
