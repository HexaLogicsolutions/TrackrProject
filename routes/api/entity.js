const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();
const Entity = require("../../models/Entity");

router.post("/", (req, res) => {
  const {
    code,
    extcode,
    serial,
    epc,
    desc,
    material,
    weight,
    purity,
    type,
    subtype,
    brand,
    status,
    warehouse,
    area,
    location,
    lastseen,
    duration,
  } = req.body;
  if (!code || !desc) {
    res.json({ success: false, msg: "Please enter all the data" });
  }
  Entity.findOne({ ent_code: code }).then((entity) => {
    if (entity) {
      return res.json({ success: false, msg: "Entity code already exits" });
    }
    const newEntity = new Entity({
      ent_company: "HLS",
      ent_code: code,
      ent_desc: desc,
      ent_serial: serial,
      ent_extcode: extcode,
      ent_epc: epc,
      ent_material: material,
      ent_type: type,
      ent_subtype: subtype,
      ent_brand: brand,
      ent_status: status,
      ent_warehouse: warehouse,
      ent_area: area,
      ent_location: location,
      ent_weight: weight,
      ent_purity: purity,
      ent_lastseen: lastseen,
      ent_duration: duration,
    });
    newEntity
      .save()
      .then((data) => {
        console.log(data);
        return res.json({ success: true, msg: "Entity added" });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          success: false,
          msg: " Entitycode could not be saved",
        });
      });
  });
});

router.get("/", (req, res) => {
  Entity.find()
  
    .then((entity) => {
      res.send(entity);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/current-stock-by-material", (req, res) => {
  console.log("in current-stock-by-material()xxx");
  const mydata = Entity.aggregate([
    {
      $lookup: {
        from: "material",
        localField: "ent_material",
        foreignField: "mat_code",
        as: "mydata",
      },
    },
    
    { $match: { ent_status: "STK" } },
    { $group: { _id: "$mydata.mat_name", TotalMaterial: { $sum: 1 } } },
    {$sort: {_id: 1}}
  ])
    .then((entity) => {
      if (entity.length == 0) 
        res.send("Not found");
      else {
        // for (i = 0; i < entity.length; i++) {
        //   const entityx = entity[i];
        //   console.log("ent:" + entityx._id);
        // }
        res.send(entity);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/current-stock-by-status", (req, res) => {
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;
  const mydata = Entity.aggregate([
    // { $match: { ent_status: "STK" } },
    {
      $lookup: {
        from: "entity_status",
        localField: "ent_status",
        foreignField: "sta_code",
        as: "mydata",
      },
    },
    { $group: { _id: "$mydata.sta_desc", TotalMaterial: { $sum: 1 } } },
    { $sort: {_id: 1}}
  ])
    .then((status) => {
      if (status.length == 0) res.send("Not found");
      else res.send(status);
      // console.log("Totolmaterial:" + mydata);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/current-stock-by-subtype", (req, res) => {
  console.log("in current-stock-by-subtype()");
  const mydata = Entity.aggregate([
    {
      $lookup: {
        from: "entity_subtype",
        localField: "ent_subtype",
        foreignField: "est_code",
        as: "mydata",
      },
    },
    { $match: { ent_status: "STK" } },
    { $group: { _id: "$mydata.est_name", TotalMaterial: { $sum: 1 } } },
    { $sort: {_id: 1}}
   
  
  ])
    .then((entity) => {
      if (entity.length == 0) res.send("Not found");
      else {
        // console.log("current-stock-by-subtype:" + entity);

        for (i = 0; i < entity.length; i++) {
          const entityx = entity[i];
          console.log("entsub:" + entityx._id);
        }
        res.send(entity);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//get entity by epc
router.get("/epc/:epc", (req, res) => {
  Entity.find({ ent_epc: req.params.epc })
    .then((entity) => {
      if (entity.length == 0) res.send("Not found");
      else res.send(entity[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get entity by code
router.get("/:code", (req, res) => {
  console.log("code: " + req.params.code);
  Entity.find({ ent_code: req.params.code })
    .then((entity) => {
      if (entity.length == 0) res.send("No entity   type found");
      else res.send(entity[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:code", (req, res) => {
  Entity.find({ ent_code: req.params.code })
    .then((entity) => {
      if (entity.length == 0) res.send("entity sub type not  found");
      else {
        const entityy = entity[0];
        entityy
          .delete()
          .then((ent) => {
            console.log("entity not found");
            res.send(`Entity  code ${req.params.code} deleted successfully.`);
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
  const {
    code,
    extcode,
    serial,
    epc,
    desc,
    material,
    type,
    subtype,
    brand,
    status,
    location,
    weight,
    purity,
    lastseen,
    duration,
  } = req.body;
  Entity.findOne({ ent_code: code }).then((entity) => {
    if (!entity) {
      return res.json({ success: false, msg: "Entity not exist" });
    }

    Entity.updateOne(
      { ent_code: code },
      {
        $set: {
          ent_desc: desc,
          ent_extcode: extcode,
          ent_serial: serial,
          ent_epc: epc,
          ent_material: material,
          ent_type: type,
          ent_subtype: subtype,
          ent_brand: brand,
          ent_status: status,
          ent_location: location,
          ent_weight: weight,
          ent_purity: purity,
          ent_lastseen: lastseen,
          ent_duration: duration,
        },
      }
    )
      .then((resp) => {
        console.log("success");
        res.json({
          success: true,
          msg: " Entity  Updated",
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
