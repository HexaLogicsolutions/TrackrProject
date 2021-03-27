var express = require("express");
var router = express.Router();
var request = require("request");
const Sale = require("../../models/Sale");
const Entity = require("../../models/Entity");
router.get("/test", async function (req, res, next) {
  // let users = await User.find();
  let dataApi = await Sale.find();

  // const user= users[0];
  console.log("Records:" + dataApi.length);
  var data = {
    template: { shortid: "faXzusepxf" },
    // data:{
    //     "books":[{
    //         "name":"my name is",
    //         "author":"a.shankar"

    //     },
    // ]
    // },
    data: {
      data: dataApi,
    },
    options: {
      preview: true,
    },
  };
  var options = {
    uri: "http://localhost:5488/api/report",
    method: "POST",
    json: data,
    // 'headers': { 'User-Agent': 'request',
    // 'Content-Type': 'application/json' },
    // 'body': JSON.stringify({ 'template': { 'shortid': 'NsO5t1aHuD'}, //valid short id
    //  'data': req.data // a valid report data object (7751 chars)
    // })
  };

  request(options).pipe(res);
});
router.get("/sales", async function (req, res, next) {
  const subtype = req.query.subtype;
  const entitytype = req.query.entitytype;
  const warehouse = req.query.warehouse;
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;
  const material = req.query.material;
  let subTypeFilter = {};
  console.log("subtype:" + subtype);
  if (subtype) {
    const newsubtype = subtype.split("|");
    subTypeFilter = {
      sal_subtype: { $in: newsubtype },
    };
    console.log("subTypeFilter:" + subTypeFilter);
  }
  let entityTypeFilter = {};
  if (entitytype) {
    const newentitytype = entitytype.split("|");
    entityTypeFilter = {
      sal_type: { $in: newentitytype },
    };
  }
  let warehouseFilter = {};
  if (warehouse) {
    const newWarehouse = warehouse.split("|");
    warehouseFilter = {
      sal_warehouse: { $in: newWarehouse },
    };
  }
  let dateFilter = {};
  if (fromDt && toDt) {
    dateFilter = {
      sal_date: {
        $gte: fromDt,
        $lt: toDt,
      },
    };
  }
  let materialFilter = {};
  if (material) {
    const newmaterial = material.split("|");
    materialFilter = {
      sal_material: { $in: newmaterial },
    };
  }

  let dataApi = await Sale.find({
    $and: [
      subTypeFilter,
      entityTypeFilter,
      materialFilter,
      dateFilter,
      warehouseFilter,
    ],
  });

  // const user= users[0];
  console.log("Records:" + dataApi.length);
  var data = {
    template: { shortid: "faXzusepxf" },
    // data:{
    //     "books":[{
    //         "name":"my name is",
    //         "author":"a.shankar"

    //     },
    // ]
    // },
    data: {
      from: fromDt,
      to: toDt,
      data: dataApi,
    },
    options: {
      preview: true,
    },
  };
  var options = {
    uri: "http://localhost:5488/api/report",
    method: "POST",
    json: data,
    // 'headers': { 'User-Agent': 'request',
    // 'Content-Type': 'application/json' },
    // 'body': JSON.stringify({ 'template': { 'shortid': 'NsO5t1aHuD'}, //valid short id
    //  'data': req.data // a valid report data object (7751 chars)
    // })
  };
  request(options).pipe(res);
});
router.get("/salesnew", async function (req, res, next) {
  const subtype = req.query.subtype;
  const entitytype = req.query.entitytype;
  const warehouse = req.query.warehouse;
  const fromDt = req.query.fromDt;
  const toDt = req.query.toDt;
  const material = req.query.material;

  let subTypeFilter = {};
  console.log("subtype:" + subtype);
  if (subtype) {
    const newsubtype = subtype.split("|");
    subTypeFilter = {
      sal_subtype: { $in: newsubtype },
    };
    console.log("subTypeFilter:" + subTypeFilter);
  }

  let entityTypeFilter = {};
  if (entitytype) {
    const newentitytype = entitytype.split("|");
    entityTypeFilter = {
      sal_type: { $in: newentitytype },
    };
  }

  let warehouseFilter = {};
  if (warehouse) {
    const newWarehouse = warehouse.split("|");
    warehouseFilter = {
      sal_warehouse: { $in: newWarehouse },
    };
  }

  let dateFilter = {};
  if (fromDt && toDt) {
    dateFilter = {
      sal_date: {
        $gte: fromDt,
        $lt: toDt,
      },
    };
  }

  let materialFilter = {};
  if (material) {
    const newmaterial = material.split("|");
    materialFilter = {
      sal_material: { $in: newmaterial },
    };
  }

  let dataApi = await Sale.find({
    $and: [
      subTypeFilter,
      entityTypeFilter,
      materialFilter,
      dateFilter,
      warehouseFilter,
    ],
  });

  // const user= users[0];
  console.log("Records:" + dataApi.length);
  var data = {
    template: { shortid: "faXzusepxf" },
    // data:{
    //     "books":[{
    //         "name":"my name is",
    //         "author":"a.shankar"

    //     },
    // ]
    // },
    data: {
      from: fromDt,
      to: toDt,
      data: dataApi,
    },
    options: {
      preview: true,
    },
  };
  var options = {
    uri: "http://localhost:5488/api/report",
    method: "POST",
    json: data,
    // 'headers': { 'User-Agent': 'request',
    // 'Content-Type': 'application/json' },
    // 'body': JSON.stringify({ 'template': { 'shortid': 'NsO5t1aHuD'}, //valid short id
    //  'data': req.data // a valid report data object (7751 chars)
    // })
  };

  request(options).pipe(res);
});
router.get("/stock", (req, res) => {
  const mydata = Entity.aggregate([
    // {
    //   $lookup: {
    //     from: "material",
    //     localField: "ent_material",
    //     foreignField: "mat_code",
    //     as: "material",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "material",
    //     localField: "ent_material",
    //     foreignField: "mat_code",
    //     as: "data",
    //   },
    // },

    //  [ {
    //     $lookup:{
    //       from:{},
    //       localField:{},
    //       foreignField:{},
    //       as:{}

    //     }
    //   }],
    // [
    //   { $group: {
    //     _id: { country: "$country", city: "$city" },
    //     val: { $sum: "$val" }
    //   } }
    // ]
    // { $match: { ent_status: "STK" } },
    // {
    //   $match: {
    //     $and: [
    //       {

    //         ent_subtype: { $in: newsubtype },

    //         // ent_lastseen: {
    //         //   $gte: new Date(fromDt),
    //         //   $lt: new Date(toDt),
    //         // },
    //       },
    //     ],
    //   },
    // },
    { $group: { _id: "$ent_material", TotalMaterial: { $sum: 1 } } },
    // { $group: { _id: "$material.mat_name", TotalMaterial: { $sum: 1 } } },
    // [
    //     { $group: {
    //       _id: { material: "$ent_material", subtype: "$ent_subtype",warehouse: "$ent_warehouse",status: "$ent_status" },
    //       Total: { $sum:1 },
    //     } }
    //   ],
    // {$sort: {_id: 1}}
  ])
    .then((entity) => {
      if (entity.length == 0) res.send("Not found");
      else {
        res.send(entity);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/stocktest", (req, res) => {
  console.log("in stocktest()");
  // const fromDt = req.query.fromDt;
  // const toDt = req.query.toDt;
  const subtype = req.query.subtype;
  const material = req.query.material;
  const warehouse = req.query.warehouse;
  const status = req.query.status;
//////////////////////////SUBTYPE////////////////////////////////////
  let subTypeFilter = {};
  console.log("subtype:" + subtype);
  if (subtype) {
    var newsubtype = subtype.split("|").map(function (item) {
      return parseInt(item, 10);
    });

    subTypeFilter = {
      ent_subtype: { $in: newsubtype },
    };
    console.log("subTypeFilter:" + subTypeFilter);
  }
  /////////////////////////////////////MATERIAL///////////////////////////////////////
  let materialFilter = {};
  console.log("material:" + material);
  if (material) {
    var newmaterial = material.split("|");
    materialFilter = {
      ent_material: { $in: newmaterial },
    };
  }
///////////////////////////////////////WAREHOUSE///////////////////////////////////////
let warehouseFilter = {};
if (warehouse) {
  var newwarehouse = warehouse.split("|").map(function (item) {
    return parseInt(item, 10);
  });

  warehouseFilter = {
    ent_warehouse: { $in: newwarehouse },
  };
  // console.log("subTypeFilter:" + subTypeFilter);
}
////////////////////////////////////////////STATUS///////////////////////////////////////
let statusFilter = {};
  // console.log("material:" + material);
  if (status) {
    var newstatus = status.split("|");
    statusFilter = {
      ent_status: { $in: newstatus },
    };
  }
  const mydata = Entity.aggregate([
    {
      $lookup: {
        from: "material",
        localField: "ent_material",
        foreignField: "mat_code",
        as: "material",
      },
    },
    {
      $lookup: {
        from: "entity_subtype",
        localField: "ent_subtype",
        foreignField: "est_code",
        as: "subtype",
      },
    },
    {
      $lookup: {
        from: "warehouse",  
        localField: "ent_warehouse",
        foreignField: "whs_code",
        as: "warehouse",
      },
    },
    {
      $lookup: {
        from: "entity_status",
        localField: "ent_status",
        foreignField: "sta_code",
        as: "status",
      },
    },
    {
      $match: {
        $and: [
          // { ent_subtype: 13 },
          // { ent_material: "GLD" },
          materialFilter,
          subTypeFilter,
          warehouseFilter,
          statusFilter,
          // {
          //   ent_subtype: { $in: [14,13,17] },
          // },
          // {
          //   ent_lastseen: {
          //     $gte: new Date(fromDt),
          //     $lt: new Date(toDt),
          //   },
          // },
        ],
      },
    },
    {
      $group: {
        _id: {
          material: "$material.mat_name",
          subtype: "$subtype.est_name",
          warehouse: "$warehouse.whs_name",
          status: "$status.sta_desc",
        },
        Total: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ])
    .then((entity) => {
      if (entity.length == 0) res.send("");
      else res.send(entity);
      // console.log("Totalmaterial:" + mydata);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
