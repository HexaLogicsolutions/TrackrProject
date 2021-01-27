const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();

const EntitySubType = require("../../models/EntitySubType");

router.post("/", (req, res) => {
  const { code, name, type,active } = req.body;
  // return error if code has a value
  if (code) {
    res.json({ success: false, msg: "Invalid parameters" });
  }

  if (!name) {
    res.json({ success: false, msg: "Please enter all the data" });
  }

   EntitySubType.findOne({ est_name: name})
  .collation({ locale: 'en_US', strength: 2 })
  .then((entitysubType) => {
    if (entitysubType) {
      return res.json({ success: false, msg: "Name already exits" });
    }

    EntitySubType.find({})
      .select("est_code")
      .sort({ est_code: -1 })
      .limit(1)
      .exec(function (err, doc) {
        let max_code = doc[0].est_code;
        console.log("max :"+max_code);

        const newEntitySub = new EntitySubType({
          est_company: "HLS",
          est_code: max_code+1,
          est_type: type,
          est_name: name,
          est_active: active,
        });

        newEntitySub
          .save()
          .then((data) => {
            console.log(data);
            return res.json({ success: true, msg: " entity sub type added" });
          })
          .catch((err) => {
            console.log(err);
            return res.json({
              success: false,
              msg: "Entity sub type name could not be saved",
            });
          });
      });

  });
});

// get all groups
router.get("/", (req, res) => {
  EntitySubType.find()
    .then((entitysubType) => {
      res.send(entitysubType);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get group by code
router.get("/:code", (req, res) => {
  console.log("code: " + req.params.code);
  EntitySubType.find({ est_code: req.params.code })
    .then((entitysubType) => {
      if (entitysubType.length == 0) res.send("No entity  sub type found");
      else res.send(entitysubType[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get group by entity type
router.get("/type/:code", (req, res) => {
  console.log("type: " + req.params.code);
  EntitySubType.find({ est_type: req.params.code })
    .then((entitysubType) => {
      if (entitysubType.length == 0) res.send("No entity  sub type found");
      else res.send(entitysubType);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.delete("/:code", (req, res) => {
  EntitySubType.find({ est_code: req.params.code })
    .then((entitysubType) => {
      if (entitysubType.length == 0) res.send("entity sub type not  found");
      else {
        const entitysubtype = entitysubType[0];
        entitysubtype
          .delete()
          .then((est) => {
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
  const { code, name, active ,type} = req.body;

  console.log("code :"+code);
  console.log("name :"+name);
  console.log("active :"+active);

  EntitySubType.findOne({ est_code: code }).then((entitysubType) => {
    if (!entitysubType) {
      return res.json({ success: false, msg: "Entity sub type not exist" });
    }

    EntitySubType.updateOne(
      { est_code: code },
      {
        $set: {
            est_type: type,
          est_name: name,
          est_active: active,
        },
      }
    )
      .then((resp) => {
        console.log("success");
        res.json({
          success: true,
          msg: " Entity  Sub type Updated",
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
