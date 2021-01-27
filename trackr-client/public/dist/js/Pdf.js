window.onload = function(){
    document.getElementById("pdf" )
    var el = document.getElementById('overlayBtn');
if(el){
  

    e1.addEventListener("click",()=>{
        const invoice = this.document.getElementById("invoice");
      console.log(window);
      var opt = {
        margin:       1,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 1.05 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(invoice).set(opt).save();
    })
  }
}