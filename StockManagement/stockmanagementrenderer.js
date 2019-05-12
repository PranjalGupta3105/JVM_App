const electron = require('electron');
const ipc = electron.ipcRenderer;

const getProductInventorybtn = document.getElementById('getProductCountbtn');
getProductInventorybtn.addEventListener('click', function(){
     var productId = document.getElementById("productid").value;
    ipc.send('checkItemInStock',[productId]);

});

const productdetailsdiv = document.getElementById('productavailabilitydetails');
const checkavailable = document.getElementById('availability');
const availableqty = document.getElementById('availableQty');
ipc.on('api response', function (event,data) {
    // console.log(data);
    // console.log(JSON.parse(data));
    // console.log(JSON.parse(data).key);
    // console.log(JSON.parse(data).value);
    if(JSON.parse(data).key == true)
    {
      checkavailable.innerHTML = "Yes";
      availableQty.innerHTML = JSON.parse(data).value;
    }
});

const getBackbtn = document.getElementById('Back');
getBackbtn.addEventListener('click', function(){
    // history.back()
    ipc.send('gettocontextmenu');
});
