const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();

const EntityType = require("../../models/EntityType");

router.post("/", (req, res) => {
  const { code, name, active } = req.body;
  // return error if code has a value
  if (code) {
    res.json({ success: false, msg: "Invalid parameters" });
  }

  if (!name) {
    res.json({ success: false, msg: "Please enter all the data" });
  }

   EntityType.findOne({ ett_name: name})
  .collation({ locale: 'en_US', strength: 2 })
  .then((entityType) => {
    if (entityType) {
      return res.json({ success: false, msg: "Name already exits" });
    }

    EntityType.find({})
      .select("ett_code")
      .sort({ ett_code: -1 })
      .limit(1)
      .exec(function (err, doc) {
        let max_code = doc[0].ett_code;
        console.log("max :"+max_code);

        const newEntity = new EntityType({
          ett_company: "HLS",
          ett_code: max_code+1,
          ett_name: name,
          ett_active: active,
        });

        newEntity
          .save()
          .then((data) => {
            console.log(data);
            return res.json({ success: true, msg: " entity type added" });
          })
          .catch((err) => {
            console.log(err);
            return res.json({
              success: false,
              msg: "Entity type name could not be saved",
            });
          });
      });

  });

  
});

// get all groups
router.get("/", (req, res) => {
  EntityType.find()
    .then((entityType) => {
      res.send(entityType);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get group by code
router.get("/:code", (req, res) => {
  console.log("code: " + req.params.code);
  EntityType.find({ ett_code: req.params.code })
    .then((entityType) => {
      if (entityType.length == 0) res.send("No entity type found");
      else res.send(entityType[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:code", (req, res) => {
  EntityType.find({ ett_code: req.params.code })
    .then((entityType) => {
      if (entityType.length == 0) res.send("entity type not  found");
      else {
        const entitytype = entityType[0];
        entitytype
          .delete()
          .then((ett) => {
            console.log("group not found");
            res.send(
              `Entity type code ${req.params.code} deleted successfully.`
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

  EntityType.findOne({ ett_code: code }).then((entityType) => {
    if (!entityType) {
      return res.json({ success: false, msg: "Entity type not exist" });
    }

    EntityType.updateOne(
      { ett_code: code },
      {
        $set: {
          ett_name: name,
          ett_active: active,
        },
      }
    )
      .then((resp) => {
        console.log("success");
        res.json({
          success: true,
          msg: " Entity type Updated",
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
