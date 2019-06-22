const ipc = require('electron').ipcRenderer

const printPDFBtn = document.getElementById('PrintInvoicebtn');

printPDFBtn.addEventListener('click', function () {
  console.log("Print To PDF Button Clicked");
  ipc.send('print');
});
