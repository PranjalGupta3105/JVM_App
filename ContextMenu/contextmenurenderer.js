const electron = require('electron');
const ipc = electron.ipcRenderer;

const StockMgtbtn = document.getElementById('StckMgtbtn');
StockMgtbtn.addEventListener('click', function(){
    // var loginId = document.getElementById("UserName").value;
    // var password = document.getElementById("Password").value;
    ipc.send('LoadStockManagementPage');
    // AuthenticateUser(loginId,password)
});

const OrderMgtbtn = document.getElementById('OrdrMgtbtn');
OrderMgtbtn.addEventListener('click', function(){
    // var loginId = document.getElementById("UserName").value;
    // var password = document.getElementById("Password").value;
    ipc.send('LoadOrderManagementPage');
    // AuthenticateUser(loginId,password)
});

const TransactionMgtbtn = document.getElementById('TranscMgtbtn');
TransactionMgtbtn.addEventListener('click', function(){
    // var loginId = document.getElementById("UserName").value;
    // var password = document.getElementById("Password").value;
    ipc.send('LoadTransactionManagementPage');
    // AuthenticateUser(loginId,password)
});
