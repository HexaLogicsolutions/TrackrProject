const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();
// User model
const EntityStatus = require("../../models/EntityStatus");

router.post("/", (req, res) => {
  const { code, desc, enabled } = req.body;

  if (!code || !desc) {
    res.json({ success: false, msg: "Please enter all the data" });
  }
  if (code.length > 3) {
    res.json({
      success: false,
      msg: "Status code should not be longer than 3 charecters",
    });
  }

  EntityStatus.findOne({ sta_code: code }).then((status) => {
    if (status) {
      return res.json({ success: false, msg: "Status code already exists" });
    }
    const newEntityStatus = new EntityStatus({
      sta_code: code,
      sta_desc: desc,
      sta_enabled: enabled,
    });
    newEntityStatus
      .save()
      .then((data) => {
        console.log(data);
        return res.json({ success: true, msg: " Status added" });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          success: false,
          msg: "Status code could not be saved",
        });
      });
  });
});

// get all groups
router.get("/", (req, res) => {
  EntityStatus.find()
    .then((status) => {
      res.send(status);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get group by code
router.get("/:code", (req, res) => {
  EntityStatus.find({ sta_code: req.params.code })
    .then((status) => {
      if (status.length == 0) res.send("No status found");
      else res.send(status[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:code", (req, res) => {
  EntityStatus.find({ sta_code: req.params.code })
    .then((status) => {
      if (status.length == 0) res.send("status not  found");
      else {
        const Status = status[0];
        console.log(Status);
        Status.delete()
          .then((sts) => {
            console.log("status not found");
            res.send(`status ${req.params.code} deleted successfully.`);
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
  const { code, desc, enabled } = req.body;

  EntityStatus.findOne({ sta_code: code }).then((status) => {
    if (!status) {
      return res.json({ success: false, msg: "Status does not exist" });
    }

    EntityStatus.updateOne(
      { sta_code: code },
      {
        $set: {
          sta_desc: desc,
          sta_enabled: enabled,
        },
      }
    )
      .then((resp) => {
        console.log("success");
        res.json({
          success: true,
          msg: " Status Profile Updated",
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
