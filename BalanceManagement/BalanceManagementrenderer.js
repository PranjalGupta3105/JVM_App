const electron = require('electron');
const ipc = electron.ipcRenderer;

const PrepareTrialBalancebtn = document.getElementById("PrepareTrialBalancebtn");
PrepareTrialBalancebtn.addEventListener('click',function(){
  ipc.send('ComputeTrialBalanceSheet')
});
