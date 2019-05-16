const electron = require('electron');
const ipc = electron.ipcRenderer;

const PlaceOrderbtn = document.getElementById('PlaceOrderbtn');
PlaceOrderbtn.addEventListener('click', function(){
     var OrderId = "12345";
     var Products = document.getElementById("products").value;
     var ProductsCode = document.getElementById("productscode").value;
     var OrderPlacementDateTime = document.getElementById("datetimepicker1").value;
     var Manager = document.getElementById("manager").value;
     var ClientName = document.getElementById("clientname").value;
     var ClientEmail = document.getElementById("clientemail").value;
     var ClientPhone = document.getElementById("clientphone").value;
     var ClientAddress = document.getElementById("clientaddress").value;
     var DeliveryAddress = document.getElementById("deliveryaddress").value;
     var ExpectedDeliveryDate = document.getElementById("datetimepicker2").value;
     var Quantity = document.getElementById("quantity").value;
    // var password = document.getElementById("Password").value;

    console.log(Products);

    ipc.send('PlaceOrder',
    [
      OrderId,
      Products,
      ProductsCode,
      OrderPlacementDateTime,
      Manager,
      ClientName,
      ClientEmail,
      ClientPhone,
      ClientAddress,
      DeliveryAddress,
      ExpectedDeliveryDate,
      Quantity
    ]);

})

// const OrderMgtbtn = document.getElementById('OrdrMgtbtn');
// OrderMgtbtn.addEventListener('click', function(){
//     // var loginId = document.getElementById("UserName").value;
//     // var password = document.getElementById("Password").value;
//     ipc.send('LoadOrderManagementPage');
//     // AuthenticateUser(loginId,password)
// })
