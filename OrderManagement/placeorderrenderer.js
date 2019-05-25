const electron = require('electron');
const ipc = electron.ipcRenderer;

// --------------- Get All of the Products and their Products Code from the API on the Page Load
window.onload = function(){
  ipc.send('getAllRegisteredProducts');
};
// ---------------------------------------------------------
// -------------- Insert the List of Products from the API in the Products List inside <select> statement ------
ipc.on('productsListResponse',function(event,data){
    let products = [];
    let productIds = [];
    console.log('\n'+' Products List Returned In Response : '+data);
    var productsListJSON = JSON.parse(data);
     console.log(productsListJSON);
    for(i=0;i< productsListJSON.length ;i++)
    {
      console.log(Object.values(productsListJSON[i]));
      console.log("Product Id :"+Object.keys(productsListJSON[i]));
      products.push(Object.values(productsListJSON[i]));
      productIds.push(Object.keys(productsListJSON[i]));
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

    // ------------ Display the Selected Products List in the <p> --
    $('#products').click(function(){
      var selectedProducts = $('#products').val();
      console.log("Currently Selected Products By User -"+selectedProducts);
      let selectedProductsId = [];
      for(var j=0;j<selectedProducts.length;j++)
      {
        for(i=0;i< productsListJSON.length ;i++)
        {
          if(selectedProducts[j]==Object.values(productsListJSON[i]))
          {
          products.push(Object.values(productsListJSON[i]));
          selectedProductsId.push(Object.keys(productsListJSON[i]));
          }
         }
      }
      console.log("All Selected Products Id's"+selectedProductsId);
      // Get the Product Id from the Array as per the Product Selected
      var productsdiv = document.getElementById('selected-products').innerHTML = selectedProducts;
      var productscode = document.getElementById('productscode').value = selectedProductsId;
    });

});
// -------------------------------------------------------------------------



// -----------------------------------------------------------------
const PlaceOrderbtn = document.getElementById('PlaceOrderbtn');

PlaceOrderbtn.addEventListener('click', function(){
     var OrderId = "12345";
     var Products = document.getElementById("products").value;
     var ProductsCode = document.getElementById("productscode").value;
     var OrderPlacementDateTime = document.getElementById("orderplacementdatetime").value;
     var Manager = document.getElementById("manager").value;
     var ClientName = document.getElementById("clientname").value;
     var ClientEmail = document.getElementById("clientemail").value;
     var ClientPhone = document.getElementById("clientphone").value;
     var ClientAddress = document.getElementById("clientaddress").value;
     var DeliveryAddress = document.getElementById("deliveryaddress").value;
     var ExpectedDeliveryDate = document.getElementById("expecteddeliverydatetime").value;
     var Quantity = document.getElementById("quantity").value;

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
