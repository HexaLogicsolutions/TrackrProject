const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();

const Warehouse = require("../../models/Warehouse");

router.post("/", (req, res) => {
  const { code, name, active } = req.body;
  // return error if code has a value
  if (code) {
    res.json({ success: false, msg: "Invalid parameters" });
  }

  if (!name) {
    res.json({ success: false, msg: "Please enter all the data" });
  }

  Warehouse.findOne({ whs_name: name})
  .collation({ locale: 'en_US', strength: 2 })
  .then((warehouse) => {
    if (warehouse) {
      return res.json({ success: false, msg: "Name already exits" });
    }
Warehouse.find({})
      .select("whs_code")
      .sort({ whs_code: -1 })
      .limit(1)
      .exec(function (err, doc) {
        let max_code = doc[0].whs_code;
        console.log("max :"+max_code);

        const newLocation = new Warehouse({
          whs_company: "HLS",
          whs_code: max_code+1,
          whs_name: name,
          whs_active: active,
        });

        newLocation
          .save()
          .then((data) => {
            console.log(data);
            return res.json({ success: true, msg: " Warehouse added" });
          })
          .catch((err) => {
            console.log(err);
            return res.json({
              success: false,
              msg: "Warehouse name could not be saved",
            });
          });
      });

  });
});

// get all groups
router.get("/", (req, res) => {
Warehouse.find()
    .then((warehouse) => {
      res.send(warehouse);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get group by code
router.get("/:code", (req, res) => {
  console.log("code: " + req.params.code);
Warehouse.find({ whs_code: req.params.code })
    .then((warehouse) => {
      if (warehouse.length == 0) res.send("No warehouse found");
      else res.send(warehouse[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:code", (req, res) => {
  Warehouse.find({ whs_code: req.params.code })
    .then(( Warehouse) => {
      if ( Warehouse.length == 0) res.send("warehouse not found");
      else {
        const warehouse = Warehouse[0];
        warehouse.delete()
          .then((ett) => {
            console.log("warehouse not found");
            res.send(
              `Warehouse code ${req.params.code} deleted successfully.`
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
  const { code, name, active } = req.body;

  console.log("code :"+code);
  console.log("name :"+name);
  console.log("active :"+active);

  Warehouse.findOne({ whs_code: code }).then((warehouse) => {
    if (!warehouse) {
      return res.json({ success: false, msg: "Location type not exist" });
    }

    Warehouse.updateOne(
      { whs_code: code },
      {
        $set: {
          whs_name: name,
          whs_active: active,
        },
      }
    )
      .then((resp) => {
        console.log("success");
        res.json({
          success: true,
          msg: " Location type Updated",
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
