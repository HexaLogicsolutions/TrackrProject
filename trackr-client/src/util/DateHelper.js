
const DataHelper = {
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  },

  getStartOfDate(date) {
    return this.formatDate(date) + "T00:00:00.000Z";


  },
  getEndOfDate(date) {
    return this.formatDate(date) + "T23:59:59.000Z";
  }

}
export default DataHelper;