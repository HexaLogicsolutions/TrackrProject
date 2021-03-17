const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();

const Sale = require("../../models/Sale");

// get all entity
router.get("/", (req, res) => {
  Sale.find()
    .then((sale) => {
      res.send(sale);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/sale-quantity-by-material", (req, res) => {
  console.log("in sale-quantity-by-materialxxx()");
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;
  // console.log("from:" + fromDt);
  // console.log("to:" + toDt);
  const mydata = Sale.aggregate([
    {
      $lookup: {
        from: "material",
        localField: "sal_material",
        foreignField: "mat_code",
        as: "mydata",
      },
    },
    {
      $match: {
        sal_date: {
          $gte: new Date(fromDt),
          $lt: new Date(toDt),
        },
      },
    },
    {
      $group: { _id: "$mydata.mat_name", TotalMaterial: { $sum: 1 } },
      
    },
    { $sort: {_id: 1}}
  ])
    .then((sale) => {
      if (sale.length == 0) res.send("");
      else res.send(sale);
      // console.log("Totalmaterial:" + mydata);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/sale-report", (req, res) => {
  console.log("in sale-reportxxx()");
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;
  const subtype = req.query.subtype;
  const warehouse = req.query.warehouse;
  const material = req.query.material;

  // console.log("from:" + fromDt);
  // console.log("to:" + toDt);

  let dateFilter = {};
  if (fromDt && toDt) {
    dateFilter = {
      sal_date: {
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
      sal_subtype: { $in: newsubtype },
    };
    console.log("subTypeFilter:" + subTypeFilter);
  }

  let warehouseFilter = {};
  if (warehouse) {
    const newWarehouse = warehouse.split("|");
    warehouseFilter = {
      sal_warehouse: { $in: newWarehouse },
    };
  }

  let materialFilter = {};
  if (material) {
    const newmaterial = material.split("|");
    materialFilter = {
      sal_material: { $in: newmaterial },
    };
  }
  var mysort = { hht_datetime: 1 };
  Sale.find({
    $and: [
      subTypeFilter,
      materialFilter,
      dateFilter,
      warehouseFilter,
    ],
  }).sort(mysort)
    .then((sale) => {
      res.send(sale);
    })
    .catch((err) => {
      console.log(err);
    });
});



router.get("/sale-quantity-by-subtype", (req, res) => {
  console.log("in sale-quantity-by-subtype()");
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;
  // console.log("from:" + fromDt);
  // console.log("to:" + toDt);
  const mydata = Sale.aggregate([
    {
      $lookup: {
        from: "entity_subtype",
        localField: "sal_subtype",
        foreignField: "est_code",
        as: "mydata",
      },
    },
    {
      $match: {
        sal_date: {
          $gte: new Date(fromDt),
          $lt: new Date(toDt),
        },
      },
    },
    {
      $group: { _id: "$mydata.est_name", TotalSubtype: { $sum: 1 } },
    },
    { $sort: {_id: 1}}
  ])
    .then((sale) => {
      if (sale.length == 0) res.send("");
      else res.send(sale);
      // console.log("Totalsubtype:" + mydata);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/sale-amount-by-material", (req, res) => {
  console.log("in sale-amount-by-material()");
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;
  const mydata = Sale.aggregate([
    {
    $lookup: {
      from: "material",
      localField: "sal_material",
      foreignField: "mat_code",
      as: "mydata",
    },
  },
    {
      $match: {
        sal_date: {
          $gte: new Date(fromDt),
          $lt: new Date(toDt),
        },
      },
    },
    { $group: { _id: "$mydata.mat_name", TotalMaterial: { $sum: "$sal_price" } } },
    { $sort: {_id: 1}}
  ])
    .then((sale) => {
      if (sale.length == 0) res.send("");
      else res.send(sale);
      // console.log("Totorialmaterial:" + mydata);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/sale-amount-by-subtype", (req, res) => {
  console.log("in sale-amount-by-subtype()");
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;
  // console.log("From:" + fromDt);
  // console.log("To:" + toDt);

  const mydata = Sale.aggregate([
    {
      $lookup: {
        from: "entity_subtype",
        localField: "sal_subtype",
        foreignField: "est_code",
        as: "mydata",
      },
    },
    // saleDateFilter,
    {
      $match: {
        sal_date: {
          // $gte: new Date("2020-12-21T15:30:00.000+00:00"),
          // $lt: new Date("2020-12-30T15:30:00.000+00:00"),
          $gte: new Date(fromDt),
          $lt: new Date(toDt),
        },
      },
    },
    {
      $group: { _id: "$mydata.est_name", TotalSubtype: { $sum: "$sal_price" } },
    },
    { $sort: {_id: 1}}
  ])
    .then((entity) => {
      if (entity.length == 0) res.send("");
      else {
        // console.log("Total:" + entity);

        res.send(entity);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
