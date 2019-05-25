const electron = require('electron');
const ipc = electron.ipcRenderer;

const transactionCaptureBtn = document.getElementById('CaptureTransactionbtn');

transactionCaptureBtn.addEventListener('click',function(){

  var transactionId = document.getElementById('transactionid').value;
  var transactionDate = document.getElementById('transactiondate').value;
  var transactionAccno = document.getElementById('transactionaccno').value;
  var transactionType = document.getElementById('transactiontype').value;
  var transactionDescription = document.getElementById('transactiondescription').value;
  var transactionAmount = document.getElementById('transactionamount').value;
  var bookEntryDate = document.getElementById('bookentrydate').value;

  console.log(transactionJSON);

  ipc.send('addNewTransaction',[transactionId,transactionDate,transactionAccno,transactionType,transactionDescription,transactionAmount,bookEntryDate]);

});
