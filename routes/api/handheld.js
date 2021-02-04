const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const express = require("express");
const router = express.Router();
const Material = require("../../models/Material");
const EntityStatus = require("../../models/EntityStatus");
const EntityType = require("../../models/EntityType");
const Entity = require("../../models/Entity");
const EntitySubType = require("../../models/EntitySubType");
const Location = require("../../models/Location");
const Warehouse = require("../../models/Warehouse");
const LocationArea = require("../../models/LocationArea");
const ActionGroup = require("../../models/ActionGroup");
const UserGroup = require("../../models/UserGroup");
const HandheldTran = require("../../models/HandheldTran");

router.post("/upload", async (req, res) => {
  console.log("in hh upload");
  const { header, entities } = req.body;
  console.log("header:" + header);
  console.log("entities:" + entities);

  if (!header || !entities) {
    res.json({ success: false, msg: "Invalid data uploaded." });
  }
  var msg = "";
  console.log(header.operation);
  var hht_scanned_entities = [];
  var hht_missing_entities = [];

  for (i = 0; i < entities.length; i++) {
    const entity = entities[i];

    var hhEnt = {
      id: entity._id,
      code: entity.ent_code,
      epc: entity.ent_epc,
    };

    if (header.operation == "I" || header.operation == "N") {
      // Induction or New entry

      console.log("In Induction");
      if (entity.ent_modified == "Y") {
        console.log("updating entity");
        const updatedEntity = (({ _id, ...o }) => o)(entity); //removing _id from entity  object
        // console.log(updatedEntity);

        Entity.findOneAndUpdate(
          { ent_code: entity.ent_code },
          updatedEntity,
          { new: true, strict: true },
          function (error, result) {
            if (error) {
              console.log("Something wrong when updating data!: " + error);
              return res.json({
                success: false,
                msg: "Entity could not be updated.",
              });
            }
            // console.log(result);
          }
        );
        hht_scanned_entities.push(hhEnt);
      }
    } else if (header.operation == "L") {
      // Record sale
      console.log("In Sale");

      // check if item already sold
      try {
        var saleFound = await Sale.findOne({
          sal_entity: entity.ent_code,
          sal_serial: entity.ent_serial,
        });
        if (saleFound) {
          console.log("Already sold: " + saleFound);
          return res.json({
            success: false,
            msg:
              "Sale already recorded for this item. Please contact admin to resolve this issue.",
          });
          return;
        }
      } catch (err) {
        console.log(err);
        throw err;
      }

      // create new sale record
      console.log("creating new sale record");
      const sale = new Sale({
        sal_company: header.company,
        sal_user: header.user_code,
        sal_date: header.datetime,
        sal_warehouse: entity.ent_warehouse,
        sal_entity: entity.ent_code,
        sal_serial: entity.ent_serial,
        sal_extcode: entity.ent_extcode,
        sal_material: entity.ent_material,
        sal_type: entity.ent_type,
        sal_subtype: entity.ent_subtype,
        sal_price: entity.ent_price,
        sal_notes: header.note,
        sal_epc: entity.ent_epc,
        sal_weight: entity.ent_weight,
      });

      sale
        .save()
        .then((data) => {
          console.log("Sale record added: " + data);
          msg = "Sale record added";
        })
        .catch((err) => {
          console.log(err);
          return res.json({
            success: false,
            msg: "Sale record could not be saved",
          });
        });

      // update entity - status & last seen
      const updatedEntity = (({ _id, ...o }) => o)(entity); //removing _id from entity  object
      Entity.findOneAndUpdate(
        { ent_code: entity.ent_code },
        updatedEntity,
        // {
        //   ent_lastseen: header.datetime,
        //   ent_status: "SLD",
        // },
        {
          new: true,
          strict: true,
        },
        function (error, result) {
          if (error) {
            console.log("Something wrong when updating data!: " + error);
            return res.json({
              success: false,
              msg: "Entity could not be updated.",
            });
          }
          // console.log(result);
        }
      );
      hht_scanned_entities.push(hhEnt);
    } else if (header.operation == "S") {
      // Inventory scan
      console.log("In Scan");

      var status = "STK";
      if (entity.ent_action == "M") status = "MSG";
      console.log("Date: " + header.datetime);
      console.log("Status: " + status);

      Entity.findOneAndUpdate(
        { ent_code: entity.ent_code },
        {
          ent_lastseen: header.datetime,
          ent_status: status,
        },
        {
          new: true,
          strict: true,
        },
        function (error, result) {
          if (error) {
            console.log("Something wrong when updating data!: " + error);
            return res.json({
              success: false,
              msg: "HH Tran could not be saved",
            });
          }
          // console.log(result);
        }
      );

      if (entity.ent_action == "S") {
        // Scanned
        hht_scanned_entities.push(hhEnt);
      } else if (entity.ent_action == "M") {
        // Missing
        hht_missing_entities.push(hhEnt);
      }
    }
  }

  // create handheld tran record
  const hhtran = new HandheldTran({
    hht_company: header.company,
    hht_user: header.user_code,
    hht_user_name: header.user_name,
    hht_operation: header.operation,
    hht_datetime: header.datetime,
    hht_device_id: header.device_id,
    hht_device_name: header.device_name,
    hht_action_group: header.action_group,
    hht_scanned_entities,
    hht_missing_entities,
  });

  console.log("Id: " + header.device_id);
  console.log("Name: " + header.device_name);
  console.log("Data: " + hhtran);
  hhtran
    .save()
    .then((data) => {
      // console.log(data);
      msg = "HH Tran added successfully!";
      // return res.json({ success: true, msg: "HH Tran added" });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        msg: "HH Tran could not be saved",
      });
    });

  return res.json({
    msg,
    success: true,
  });
});

// router.get("/scans-by-date", (req, res) => {
router.get("/handheld-scan", (req, res) => {
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;

  const mydata = HandheldTran.aggregate([
    {
      $match: {
        $and: [
          {
            hht_datetime: {
              $gte: new Date(fromDt),
              $lt: new Date(toDt),
            },
          },
          {
            hht_operation: "S",
          },
        ],
      },
    },
    {
      $group: {
        _id: "$hht_datetime",
        missing: {
          $sum: { $size: "$hht_missing_entities" },
        },
        scanned: {
          $sum: { $size: "$hht_scanned_entities" },
        },
        total: {
          $sum: {
            $add: [
              { $size: "$hht_scanned_entities" },
              { $size: "$hht_missing_entities" },
            ],
          },
        },
      },
    },
    { $sort: {_id: 1}}
    // { $group: { _id: "$ent_material", TotalMaterial: { $sum: 1 } } },
  ])
    .then((entity) => {
      if (entity.length == 0) res.send("Not found");
      else res.send(entity);
      // console.log("Totolmaterial:" + mydata);
    })
    .catch((err) => {
      console.log(err);
    });
});


// router.get("/scans-by-date", (req, res) => {
  router.get("/handheld-induction", (req, res) => {
    const fromDt = req.query.fromDt;
    const toDt = req.query.toDt;
  
    const mydata = HandheldTran.aggregate([
      {
        $match: {
          $and: [
            {
              hht_datetime: {
                $gte: new Date(fromDt),
                $lt: new Date(toDt),
              },
            },
            {
              hht_operation: "I",
            },
          ],
        },
      },
      {
        $group: {
          _id: "$hht_datetime",
          inducted: {
            $sum: { $size: "$hht_scanned_entities" },
          },
        },
      },
      { $sort: {_id: 1}}
      // { $group: { _id: "$ent_material", TotalMaterial: { $sum: 1 } } },
    ])
      .then((entity) => {
        if (entity.length == 0) res.send("Not found");
        else res.send(entity);
        // console.log("Totolmaterial:" + mydata);
      })
      .catch((err) => {
        console.log(err);
      });
  });


router.post("/login", (req, res) => {
  console.log("in hh login");
  const { code, password } = req.body;
  console.log(req.body);

  {
    // Simple validation
    if (!code || !password) {
      res.json({ success: false, msg: "Please enter all the data" });
    }
    // Check user
    User.findOne({ usr_code: code })
      .then((user) => {
        console.log("in finduser");
        if (!user) {
          return res.json({
            msg: "User Does not exist",
            success: false,
            user: null,
            data: null,
          });
        }
        //
        if (user.usr_active === false) {
          return res.json({
            msg: "User not active",
            success: false,
            user: null,
            data: null,
          });
        }

        // Validate password
        bcrypt.compare(password, user.usr_password).then(async (isMatch) => {
          if (!isMatch) {
            return res.json({
              msg: "Invalid Credentials",
              success: false,
              user: null,
              data: null,
            });
          }

          // build data object

          // materials
          var materials = [];
          try {
            materials = await Material.find({ mat_enable: true }).exec();
            // console.log(materials);
          } catch (err) {
            console.log(err);
          }

          // entity Statuses
          var statuses = [];
          try {
            statuses = await EntityStatus.find({ sta_enabled: true }).exec();
            // console.log(statuses);
          } catch (err) {
            console.log(err);
          }

          // entitytypes
          var entityTypes = [];
          try {
            entityTypes = await EntityType.find({ ett_active: true }).exec();
            // console.log(entityTypes);
          } catch (err) {
            console.log(err);
          }

          // entitytypes
          var entitySubtypes = [];
          try {
            entitySubtypes = await EntitySubType.find({
              est_active: true,
            }).exec();
            // console.log(entitySubtypes);
          } catch (err) {
            console.log(err);
          }

          // Warehouses
          var warehouses = [];
          try {
            warehouses = await Warehouse.find({ whs_active: true }).exec();
            // console.log(warehouses);
          } catch (err) {
            console.log(err);
          }

          // locationAreas
          var locationAreas = [];
          try {
            locationAreas = await LocationArea.find({
              lar_active: true,
            }).exec();
            // console.log(locationAreas);
          } catch (err) {
            console.log(err);
          }

          // locations
          var locations = [];
          try {
            locations = await Location.find({ loc_enable: true }).exec();
            // console.log(locations);
          } catch (err) {
            console.log(err);
          }

          // actionGroups
          var actionGroups = [];
          try {
            actionGroups = await ActionGroup.find({ act_enabled: true }).exec();
            // console.log(actionGroups);
          } catch (err) {
            console.log(err);
          }

          // groups
          var groups = [];
          try {
            groups = await UserGroup.find({ grp_enabled: true }).exec();
            // console.log(groups);
          } catch (err) {
            console.log(err);
          }

          var data = {
            materials,
            statuses,
            entityTypes,
            entitySubtypes,
            warehouses,
            locationAreas,
            locations,
            actionGroups,
            groups,
          };

          return res.json({
            msg: "User authenticated successfully",
            success: true,
            user,
            data,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.get("/", (req, res) => {
  console.log("in hh get");
  return res.json({
    msg: "Get return",
    success: true,
  });
});

module.exports = router;
