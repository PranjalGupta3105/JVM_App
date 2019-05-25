const electron = require('electron');
const ipc = electron.ipcRenderer;

const Catalogbtn = document.getElementById('Catalogbtn');
Catalogbtn.addEventListener('click', function(){

    ipc.send('ShowCatalogPage');

});

const OrderMgtbtn = document.getElementById('OrdrMgtbtn');
OrderMgtbtn.addEventListener('click', function(){

    ipc.send('LoadOrderManagementPage');

});

const TransactionMgtbtn = document.getElementById('TranscMgtbtn');
TransactionMgtbtn.addEventListener('click', function(){

    ipc.send('LoadTransactionManagementPage');

});

const BalanceSheetMgtbtn = document.getElementById('BalShMgtbtn');
BalanceSheetMgtbtn.addEventListener('click', function(){

    ipc.send('LoadBalanceSheetManagementPage');

});

const StockMgtbtn = document.getElementById('StckMgtbtn');
StockMgtbtn.addEventListener('click', function(){

    ipc.send('LoadStockManagementPage');

});
