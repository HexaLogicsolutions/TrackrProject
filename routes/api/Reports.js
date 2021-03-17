var express = require("express");
var router = express.Router();
var request = require("request");
const Sale = require("../../models/Sale");






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
      from:fromDt,
      to:toDt,
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
      from:fromDt,
      to:toDt,
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



module.exports = router;
