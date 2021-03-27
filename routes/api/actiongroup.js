const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();

// User model
const ActionGroup = require("../../models/ActionGroup");

const Entity = require("../../models/Entity");

router.post("/", (req, res) => {
  const {
    code,
    name,
    material,
    enabled,
    entitytype,
    entitysubtype,
    warehouse,
    locationarea,
    location,
    status,
    entitycount,
  } = req.body;
  // return error if code has a value
  // if (code) {
  //   return res.json({ success: false, msg: "Invalid parameters" });
  // }
  

  if (!name) {
    return res.json({ success: false, msg: "Please enter all the data" });
  }
  // if (!code || !name || !email || !password || !group || !active) {
  //   res.json({ success: false, msg: "please enter all the data" });
  // }

  ActionGroup.findOne({ act_name: name })
    .collation({ locale: "en_US", strength: 2 })
    .then((actiongroup) => {
      if (actiongroup) {
        return res.json({ success: false, msg: "Name already exits" });
      }

      ActionGroup.find({})
        .select("act_code")
        .sort({ act_code: -1 })
        .limit(1)
        .exec(function (err, doc) {
          let max_code = doc[0].act_code;
          console.log("max :" + max_code);

          const newActiongroup = new ActionGroup({
            act_company: "HLS",
            act_code: max_code + 1,
            act_name: name,
            act_material: material,
            act_entity_type: entitytype,
            act_entity_subtype: entitysubtype,
            act_warehouse: warehouse,
            act_location_area: locationarea,
            act_locataion: location,
            act_status: status,
            act_enabled: enabled,
            act_entity_count: entitycount,
          });

          newActiongroup
            .save()
            .then((data) => {
              console.log(data);
              return res.json({ success: true, msg: " Action group added" });
            })
            .catch((err) => {
              console.log(err);
              return res.json({
                success: false,
                msg: "Actiongroup could not be saved",
              });
            });
        });
    });
});
// entity list count
router.get("/findcount", (req, res) => {
  console.log("findcount called");
  const subtype = req.query.subtype;
  const entitytype = req.query.entitytype;
  const status = req.query.status;
  const location = req.query.location;
  const material = req.query.material;
  const lastseen = req.query.lastseen;
  
  let subTypeFilter = {};
  console.log("subtype:" + subtype);
  if (subtype) {
    const newsubtype = subtype.split("|");
    subTypeFilter = {
      ent_subtype: { $in: newsubtype },
    };
    console.log("subTypeFilter:" + subTypeFilter);
  }

  let locationFilter = {};
  if (location) {
    const newlocation = location.split("|");
    locationFilter = {
      ent_location: { $in: newlocation },
    };
  }
  let EntityTypeFilter = {};
  if (entitytype) {
    const newentitytype = entitytype.split("|");
    EntityTypeFilter = {
      ent_type: { $in: newentitytype },
    };
  }

  let statusFilter = {};
  if (status) {
    const newstatus = status.split("|");
    statusFilter = {
      ent_status: { $in: newstatus },
    };
  }

  let materialFilter = {};
  if (material) {
    const newmaterial = material.split("|");
    materialFilter = {
      ent_material: { $in: newmaterial },
    };
  }
  Entity.find({
    $and: [
      locationFilter,
      subTypeFilter,
      EntityTypeFilter,
      statusFilter,
      materialFilter,
    ],
  })
    .then((entities) => {
      res.send(entities.length + "");
    })
    .catch((err) => {
      console.log(err);
    });
});

// entity list
router.get("/find", (req, res) => {
  console.log("find called");
  const subtype = req.query.subtype;
  const entitytype = req.query.entitytype;
  const status = req.query.status;
  const warehouse = req.query.warehouse;
  const locationArea = req.query.locationarea;
  const location = req.query.location;
  const material = req.query.material;
  const ent_code = req.query.entitycode;
  const ent_serial=req.query.serial;
  const ent_extcode = req.query.custcode;
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;

  let entCodeFilter = {};
  if (ent_code) {
    entCodeFilter = {
      ent_code: { $in: ent_code },
    };
  }

  let extCodeFilter = {};
  if (ent_extcode) {
    extCodeFilter = {
      ent_extcode: { $in: ent_extcode },
    };
  }
  let serialFilter = {};
  if (ent_serial) {
    serialFilter = {
      ent_serial: { $in: ent_serial },
    };
  }

  let lastSeenFilter = {};
  if (fromDt && toDt) {
    lastSeenFilter = {
      ent_lastseen: {
        $gte: fromDt,
        $lt: toDt,
      },
    };
  }

  let subTypeFilter = {};
  console.log("subtype:" + subtype);
  if (subtype) {
    const newsubtype = subtype.split("|");
    subTypeFilter = {
      ent_subtype: { $in: newsubtype },
    };
    console.log("subTypeFilter:" + subTypeFilter);
  }

  let locationFilter = {};
  if (location) {
    const newlocation = location.split("|");
    locationFilter = {
      ent_location: { $in: newlocation },
    };
  }

  // todo
  let warehouseFilter = {};
  if (warehouse) {
    const newWarehouse = warehouse.split("|");
    warehouseFilter = {
      ent_warehouse: { $in: newWarehouse },
    };
  }

  
  // todo
  let locationAreaFilter = {};
  if (locationArea) {
    const newlocationArea = locationArea.split("|");
    locationAreaFilter = {
      ent_area: { $in: newlocationArea },
    };
  }


  let EntityTypeFilter = {};
  if (entitytype) {
    const newentitytype = entitytype.split("|");
    EntityTypeFilter = {
      ent_type: { $in: newentitytype },
    };
  }

  let statusFilter = {};
  if (status) {
    const newstatus = status.split("|");
    statusFilter = {
      ent_status: { $in: newstatus },
    };
  }

  let materialFilter = {};
  if (material) {
    const newmaterial = material.split("|");
    materialFilter = {
      ent_material: { $in: newmaterial },
    };
  }
  Entity.find({
    $and: [
      locationFilter,
      subTypeFilter,
      EntityTypeFilter,
      statusFilter,
      materialFilter,
      entCodeFilter,
      extCodeFilter,
      serialFilter,
      lastSeenFilter,
      locationAreaFilter,
      warehouseFilter,
    ],
  })
    .then((entity) => {
      res.send(entity);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get all groups
router.get("/", (req, res) => {
  console.log("Query: " + req.query.name);
  ActionGroup.find()
    .then((groups) => {
      res.send(groups);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get group by code
router.get("/:code", (req, res) => {
  ActionGroup.find({ act_code: req.params.code })
    .then((groups) => {
      if (groups.length == 0) res.send("No action group found");
      else res.send(groups[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:code", (req, res) => {
  ActionGroup.find({ act_code: req.params.code })
    .then((groups) => {
      if (groups.length == 0) res.send("action group not  found");
      else {
        const group = groups[0];
        console.log(group);
        group
          .delete()
          .then((grp) => {
            console.log(" Action group not found");
            res.send(` Action Group ${req.params.code} deleted successfully.`);
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
    name,
    material,
    enabled,
    entitytype,
    entitysubtype,
    warehouse,
    locationarea,
    location,
    status,
    entitycount,
  } = req.body;
  console.log(location);

  ActionGroup.findOne({ act_code: code }).then((group) => {
    if (!group) {
      return res.json({ success: false, msg: "action group does not exist" });
    }
    console.log("group exists");
    ActionGroup.updateOne(
      { act_code: code },
      {
        $set: {
          act_name: name,
          act_material: material,
          act_entity_type: entitytype,
          act_entity_subtype: entitysubtype,
          act_warehouse: warehouse,
          act_location_area: locationarea,
          act_location: location,
          act_status: status,
          act_enabled: enabled,
          act_entity_count: entitycount,
        },
      }
    )
      .then((resp) => {
        console.log("success");
        res.json({
          success: true,
          msg: " Action Group Profile Updated",
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
