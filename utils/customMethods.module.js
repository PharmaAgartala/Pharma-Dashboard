function ExcelDateToJSDate(date) {
    const jsDate = new Date(Math.round((date - 25569) * 86400 * 1000));
  
    function pad(number) {
      return String(number).padStart(2, '0');
    }
  
    const year = jsDate.getFullYear();
    const month = pad(jsDate.getMonth() + 1); 
    const day = pad(jsDate.getDate());
  
    return `${year}-${month}-${day}`;
  }
  
module.exports = {ExcelDateToJSDate}