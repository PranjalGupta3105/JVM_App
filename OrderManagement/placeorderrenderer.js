const electron = require('electron');
const ipc = electron.ipcRenderer;

window.onload = function(){
  ipc.send('getAllRegisteredProducts');
};

ipc.on('productsListResponse',function(event,data){
    let products = [];
    console.log('\n'+' Products List Returned In Response : '+data);
    var productsListJSON = JSON.parse(data);
     console.log(productsListJSON);
    for(i=0;i< productsListJSON.length ;i++)
    {
      console.log(Object.values(productsListJSON[i]));

      products.push(Object.values(productsListJSON[i]));
    }

    console.log(products);
    console.log(products.length);
    var optionsAsString = "";

    for(i = 0; i < products.length; i++)
    {

      var $inputProduct = $("select[name='productslist']")
      $inputProduct.html("");
      $(products).each(function(i, v){
            $inputProduct.append($("<option>", { value: v, html: v }));
            });

    }

});
// -------------------------------------------------------------------------

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
