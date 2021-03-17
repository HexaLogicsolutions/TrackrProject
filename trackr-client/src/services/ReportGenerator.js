import jsPDF from "jspdf";
import pdf from "jspdf";
import ReactDOM, { render } from "react-dom";
import "jspdf-autotable";
import React, { Component } from "react";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";
import { Table } from "jspdf-autotable";

// define a generatePDF function that accepts a tickets argument
const generateSalesReportPDF = (sales, Fdate,Tdate) => {
  // initialize jsPDF
  var pdf = new jsPDF();
  
  const doc = new jsPDF();
  // var image = new Image();
  // image.src = "images/logopng.png";
  // doc.addImage(image, "PNG", 100, 2, 10, 15);
  var commaNumber = require('comma-number')
  //   debugger;
  // var img = new Image;
  // img.onload = function() {
  //     pdf.addImage(this, 10, 10);
  // };
  // img.crossOrigin = "";  // for demo as we are at different origin than image
  // img.src = "images/logopng.png";  // some random imgur image
  // define the columns we want and their titles
  const tableColumn = ["Date", "Warehouse", "Serial", "Subtype", "Price"];
  // define an empty array of rows
  const tableRows = [];
  function total(sales) {
    var sum = 0;
    sales.forEach(function (sale) {
      sum += sale.sal_price;
    });
    console.log("Sum:" + commaNumber(sum));
    return sum.toLocaleString('en-IN');//sum;
  }
  // for each ticket pass all its data into an array
  sales.forEach((sale) => {
    const saleData = [
      format(new Date(sale.sal_date), "yyyy-MM-dd"),
      sale.sal_warehouse,
      sale.sal_serial,
      sale.sal_subtype,
      // sale.sal_price,
      commaNumber(sale.sal_price),
      // called date-fns to format the date on the ticket
    ];
    // push each tickcet's info into a row
    tableRows.push(saleData);
  });
  if(tableRows.length>0){
    const totalRow = [
      "",
      "",
      "",
      "Total",
      total(sales),
      // called date-fns to format the date on the ticket
    ];
    tableRows.push(totalRow);
  }
  // doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.autoTable({
    columnStyles: { europe: { halign: "center" } },
    head: [tableColumn],
    body: tableRows,
    theme: "plain",
    styles: {
      fontSize: 12,
    },
    // drawHeaderRow: (head, data) => {
    //   data.doc.setLineWidth(0.7);
    //   data.doc.setDrawColor(0, 0, 0); // draw black lines
    //   // Write the line at the top of header
    //   data.doc.line(
    //     data.cursor.x,
    //     data.cursor.y,
    //     data.cursor.x + data.table.width,
    //     data.cursor.y
    //   );
    //   // Write the line at the bottom of header
    //   data.doc.line(
    //     data.cursor.x,
    //     data.cursor.y + head.height,
    //     data.cursor.x + data.table.width,
    //     data.cursor.y + head.height
    //   );
    // },
    // headerStyles: {rowHeight: 10, fontSize: 10},
    //     bodyStyles: {rowHeight: 5, fontSize: 10, valign: 'middle'},
      
    //     columnStyles: {text: {columnWidth: 250}},
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          // data.cell.styles.fillColor = [239, 154, 154];
          data.cell.styles.fillColor = "#f5c0c0";
      }
      if (data.column.index === 4) {
        data.cell.text= "$"+data.cell.text.toLocaleString('en-IN');
      }
      if(data.cell.text == "Total"){
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.textColor  = "red";
        // data.doc.line(
        //   data.cursor.x,
        //   data.cursor.y + 100,
        //   data.cursor.x + 200,
        //   data.cursor.y + 300
        // );
      }
    },
  });
  console.log("mynumber:"+commaNumber(1000))
  // {"₹ "}
  // {entity.ent_price.toLocaleString('en-IN')}
  // doc.autoTable(tableColumn, tableRows, {
  //   didParseCell: function (data) {
  //     console.log("Index:" + data.row.index);
  //     console.log("Pno:" + data.cell);
  //     if (data.row.index === 0 || data.row.index === 2) {
  //       data.cell.styles.fontStyle = "bold";
  //     }
  //   },
  // });
  // doc.autoTable(tableColumn, tableRows, {
  //   startY: height,
  //   afterPageContent: function(data) {
  //     doc.setFontSize(20)
  //     doc.text("After page content", 50, height - data.settings.margin.bottom - 20);
  //   }
  // });
  // doc.autoTable(tableColumn, tableRows);
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  //doc.text(80,10, "Sales Report");
  // doc.text('The text', doc.internal.pageSize.width, 10, null, null, 'center');
  doc.text('Sales Report', 100, 10, 'center');
  doc.setFontSize(12);
  doc.text(20,20,"From:");
  doc.text(40,20,Fdate);
  doc.text(140,20,"To:")
  doc.text(160,20,Tdate);
  // ticket title. and margin-top + margin-left
  // doc.text("Closed tickets within the last one month.", 14, 15);
  // doc.text(20, 50, 'This is the new ₹ symbol')
  // we define the name of our PDF file.
  // doc.save(`report_${dateStr}.pdf`);
  doc.setDrawColor("#34C5CA");
  doc.setLineWidth(0.6);
  doc.line(200,29,10,29);
  doc.setLineWidth(0.6);
  doc.line(200,22,10,22);
  // doc.setLineWidth(1.2);
  // doc.line(200,80,10,80);
  doc.setDrawColor("#FF647F");
  doc.setLineWidth(0.6);
  // doc.line(120, 11.2, 30, 11.2); // horizontal line 
  doc.line(80, 11, 120, 11); // horizontal line 
// doc.line(50, 15, 30, 15);
  // doc.save("/pdf/pdf.js");
  doc.setProperties({
    title: "Sales Report",
  });

  // doc.output('dataurlnewwindow');
  // doc.output('dataurlnewwindow', {})
  window.open(doc.output("bloburl"), "_blank");
  //   let dataSrc = pdf.output("datauristring");
  // let win = window.open("", "myWindow");
  // win.document.write("<html><head><title>jsPDF</title></head><body><embed src=" +
  //     dataSrc + "></embed></body></html>");

  // var string = doc.output("datauristring");
  // var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  // var x = window.open();
  // x.document.open();
  // x.document.write(embed);
  // x.document.close();
};

const generateHandheldReportPDF = (data, Fdate,Tdate) => {
  
  console.log("inside generateHandheldReportPDF:");
  // initialize jsPDF
  var pdf = new jsPDF();
  const doc = new jsPDF();
  var commaNumber = require('comma-number')
  // const tableColumn = ["Date", "Warehouse", "Serial", "Subtype", "Price"];
  const tableColumn = ["Date", "User", "Act Group", "Opr", "Exp", "Msg", "Pro"];
  // define an empty array of rows
  const tableRows = [];
  function totalExp(data) {
    var sum = 0;
    data.forEach(function (hhRec) {
      sum += hhRec.total;
    });
    // console.log("Sum:" + commaNumber(sum));
    return sum.toLocaleString('en-IN');//sum;
  }

  function totalProcessed(data) {
    var sum = 0;
    data.forEach(function (hhRec) {
      sum += hhRec.scanned;
    });
    // console.log("Sum:" + commaNumber(sum));
    return sum.toLocaleString('en-IN');//sum;
  }

  function totalMissing(data) {
    var sum = 0;
    data.forEach(function (hhRec) {
      sum += hhRec.missing;
    });
    // console.log("Sum:" + commaNumber(sum));
    return sum.toLocaleString('en-IN');//sum;
  }

  // for each ticket pass all its data into an array
  data.forEach((hhRec) => {
    const saleData = [
      format(new Date(hhRec._id.dateTime), "yyyy-MM-dd"),
      // hhRec._id.dateTime,
      // hhRec._id.userCode + " - "+ hhRec._id.userName,
      hhRec._id.userCode,
      hhRec._id.actionGroup,
      hhRec._id.operation,
      hhRec.scanned,
      hhRec.missing,
     
      commaNumber(hhRec.total),
      // called date-fns to format the date on the ticket
    ];
    // push each tickcet's info into a row
    tableRows.push(saleData);
  });
  if(tableRows.length>0){
    const totalRow = [
      "",
      "", 
      "",
      "Total",
      totalExp(data),
      totalProcessed(data),
      totalMissing(data),
      // called date-fns to format the date on the ticket
    ];
    tableRows.push(totalRow);
  }
  var header = function (data) {
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
//doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    doc.text("Testing Report", data.settings.margin.left, 50);
};
// var requiredPages = 0
// for(var i = 0; i < requiredPages; i++){
// doc.addPage();
// doc.text(20, 100, 'Some Text.');
// }
doc.autoTable({ html: '#my-table' })
  // doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.autoTable({
   
    columnStyles: { europe: { halign: "center" },  },
    head: [tableColumn],
    body: tableRows,
    theme: "plain",
    styles: {
      fontSize: 11,
    },
    didDrawCell: (data) => {
      if (data.section === 'body' && data.column.index === 0) {
        // doc.addImage(base64Img, 'JPEG', data.cell.x + 2, data.cell.y + 2, 10, 10)
        doc.text("hii",data.cell.x + 2, data.cell.y + 2, 10, 10)
      }
    },
      // beforePageContent: header,
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          // data.cell.styles.fillColor = [239, 154, 154];
          data.cell.styles.fillColor = "#f5c0c0";
      }
      // if (data.column.index === 2) {
      //   data.cell.text= "$"+data.cell.text.toLocaleString('en-IN');
      // }
      if(data.cell.text == "Total"){
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.textColor  = "red";
      }
    },
  });
  
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.text('Handheld Report', 100, 10, 'center');
  doc.setFontSize(12);
  doc.text(20,20,"From:");
  doc.text(40,20,Fdate);
  doc.text(140,20,"To:")
  doc.text(160,20,Tdate);
  doc.setDrawColor("#34C5CA");
  doc.setLineWidth(0.6);
  doc.line(200,29,10,29);
  doc.setLineWidth(0.6);
  doc.line(200,22,10,22);
  doc.setDrawColor("#FF647F");
  doc.setLineWidth(0.6);
  doc.line(80, 11, 120, 11); // horizontal line 
  doc.setProperties({
    title: "HH Report",
  });

  window.open(doc.output("bloburl"), "_blank");
};




// export default generatePDF;
export { generateSalesReportPDF, generateHandheldReportPDF };
