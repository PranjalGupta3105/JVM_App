const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// Including 'path' and 'url' module Because we need to load Index.html file
const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
const request = require('request');
const bufferFrom = require('buffer-from');
const net  = electron.net;
const os = require('os');
const fs = require('fs');
const printer = require('electron-print');
const browserwindowgeneratormodule = require('./BrowserWindowGenerator.js');
const apicallermodule = require('./apiCallers.js')
var http = require('http');


// --- Defining the Global References for the Windows used in the Application




// init win - this is Global reference to Windows Object, if we do not create this,
// the window will be closed automatically when javascript object is Garbage Collected
let loginWindow,selectOptionswin;

// ----------- Generate Login Window ---
function createWindow(){

// Create New Browser Window
  loginWindow = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});

// Load Index.html
  loginWindow.loadURL(url.format({
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  slashes: true
  }));

// Open devtools Do Not Open Dev Tools Untill Dying Emergency
// win.webContents.openDevTools();

  loginWindow.on('closed',()=>{
  loginWindow = null;
  });

}

ipc.on('authenticateLogin',function(event,args){

  console.log("\n"+"User LoginId:- "+args[0]+" and User Login Password:- "+args[1]);

  // ------------------------------- Defining Authentication Header -----------------------
  var authenticationHeader = "Basic " + new bufferFrom(args[0] +':'+args[1]).toString("base64");

  var apiheader =
  {
        'Content-Type': 'application/json',
        'Authorization' : authenticationHeader
  }

  console.log(apiheader);

  var getToken;

  apicallermodule.postRequests('localhost',49805,'/Token','POST',apiheader,'Token API',function(getToken){
    // Print the Token Value
    console.log("\n"+"Token Value : "+"\n"+Object.values(JSON.parse(getToken)));
    // Open the Window Only if the Token is Obtained for the User
    if(Object.values(JSON.parse(getToken)) != null)
    {
              // Create a New Window for the Menu Items Window and then Open it
              getMenuItemsWindow = browserwindowgeneratormodule.generateNewBrowserWindow
              (
                path.join(__dirname, '/ContextMenu/contextmenu.html'),
                800,
                600,
                __dirname+'/img/jug1.jpg',
                'file:',
                true
              );

              //When the Menu Items window is ready, show it up
              getMenuItemsWindow.once('ready-to-show', () => {
              getMenuItemsWindow.show()
              });

              //When the Menu Items window is closed, close it up
              getMenuItemsWindow.on('closed', function() {
              getMenuItemsWindow = null
              });

              //Close the login window once the Menu Items Window is Opened
              loginWindow.close();

    }
    //getTokenFromCallback(setcallback)
    //console.log("\n"+"Token Received"+"\n"+getToken);
  });

  // function getTokenFromCallback(getToken){
  //   console.log("Inside Function"+"\n"+getToken);
  // }
  //console.log("\n"+"Token Received"+"\n"+getToken);
  //console.log("Token value = "+getToken);


    // Complete the API Call to get the Token
    //getToken.end();
    // getToken.on('error',function(e){
    //   console.log("\n"+'Some Error Occured While making a Call to API'+e);
    // });

//   // ------------------------------- Defining Authentication Header -----------------------
//   var authenticationHeader = "Basic " + new bufferFrom(args[0] +':'+args[1]).toString("base64");
//
//   // -------------------------------------- Initializing Options for Token API --------------------------------------
//   var tokenapiOptions = {
//     host: 'localhost',
//     port: 49805,
//     path: '/Token',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization' : authenticationHeader
//     }
//   };
//
// // POST request to the Token API
//   var getToken = http.request(tokenapiOptions,function(res){
//
//       console.log("\n"+"Token API Response Status Code",res.statusCode);
//       res.on('data',function(data){
//       console.log("\n"+"Token"+"\n");
//       process.stdout.write(data);
//       console.log("\n");
//       // If Token API returns the Response
//       if(data != null)
//       {
//
//         // Create a New Window for the Menu Items Window and then Open it
//         getMenuItemsWindow = browserwindowgeneratormodule.generateNewBrowserWindow
//         (
//           path.join(__dirname, '/ContextMenu/contextmenu.html'),
//           800,
//           600,
//           __dirname+'/img/jug1.jpg',
//           'file:',
//           true
//         );
//
//         // // Create Browser Window
//         // selectOptionswin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
//         // // Load contextmenu.html
//         // selectOptionswin.loadURL(url.format({
//         // pathname: path.join(__dirname, '/ContextMenu/contextmenu.html'),
//         // protocol: 'file:',
//         // slashes: true
//         // }));
//
//         //When the Menu Items window is ready, show it up
//         getMenuItemsWindow.once('ready-to-show', () => {
//         getMenuItemsWindow.show()
//         })
//
//         //When the Menu Items window is closed, close it up
//         getMenuItemsWindow.on('closed', function() {
//         getMenuItemsWindow = null
//         })
//
//         //Close the login window once the Menu Items Window is Opened
//         loginWindow.close();
//
//       }
//     });
//   });
//   // Complete the API Call to get the Token
//   getToken.end();
//   getToken.on('error',function(e){
//     console.log("\n"+'Some Error Occured While making a Call to API'+e);
//   });

});

// ------------------------------------ Load Catalog Page ----------------------------
ipc.on('showCatalogPage',function(event,args){

      // Create Browser Window For Catalog Page
      productsCatalogWindow = browserwindowgeneratormodule.generateNewBrowserWindow
      (
        path.join(__dirname, '/ProductsCatalog/showproducts.html'),
        800,
        600,
        __dirname+'/img/jug1.jpg',
        'file:',
        true
      );

      // productsCatalogWindow = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
      // // Load contextmenu.html
      // showProductsCatalogwin.loadURL(url.format({
      //   pathname: path.join(__dirname, '/ProductsCatalog/showproducts.html'),
      //   protocol: 'file:',
      //   slashes: true
      //   }));

      //When the Products Catalog window is ready, show it up
      productsCatalogWindow.once('ready-to-show', () =>
      {
        productsCatalogWindow.show()
      });

      //When the Products Catalog window is closed, close it up
      productsCatalogWindow.on('closed', function() {
      productsCatalogWindow = null
      });

      //Close the Menu Items window
      getMenuItemsWindow.close();

});

// region : Order Management Related

//  ------------------------------ Get List of All of the Registered Products to be displayed while taking the Order-------------------------
ipc.on('getAllRegisteredProducts',function(event,args){

var getProductsAPIOptions = {
  host : 'localhost',
  port : 49805,
  path : '/api/GetRegisteredProducts',
  method : 'GET',
  headers : {}
};

var getProductsList = http.request(getProductsAPIOptions,function(res){

  console.log('\n'+'Get Prodcuts List API Status Code',res.statusCode);

  res.on('data',function(data){

    console.log("\n"+'API Response');

    var productsListJSON = JSON.parse(data);
    // process.stdout.write(productsListJSON);

    // Print List of All of the Products Available with Us.
    console.log("\n"+"JSON of all of the Products Available"+"\n"+productsListJSON);

    // Send the Data to the Renderer to display it in the List of Products
    orderManagementWindow.webContents.send('productsListResponse',data);

    console.log("\n"+"Total No of Registered Products : "+productsListJSON.length);
  });

});

  // Complete the API Call
  getProductsList.end();

  // Revert with the Error (In case)
  getProductsList.on('error',function(e){
    console.log("\n"+"Some Error Occured While making a Call to API"+"\n"+e);
  });

});

// ---------------------------------------- Place New Order ------------------------------------
ipc.on('PlaceOrder',function(event,args){

// region : This constant JSON will be hidden once we accept the Order Placment using form
  const samplejson = {
	'OrderID':123456,
	'ProductsName':['Mutki Jug','Maharaja Jug'],
	'ProductsCode':[123,123],
	'OrderPlacementTime':'2018-12-22 01:35:56',
	'Manager':'Paresh',
	'ClientName':'Durgesh',
	'ClientEmail':'gpranjal007@gmail.com',
	'ClientPhone':'8860187642',
	'ClientAddress':'xyz',
	'DeliveryAddress':'Ballam Street',
	'ExpectedDeliveryDate':'2018-12-26 12:35:56',
	'Quantity':[10,5]
  };
// endregion

// Log the Order JSON
    console.log("\n"+JSON.stringify(samplejson));

// Define Order Placement API Headers
  var orderplacementapiOptions = {
    host: 'localhost',
    port: 49805,
    path: '/api/orderplacement',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length' : Buffer.byteLength(JSON.stringify(samplejson))
    }
    };

// console.log(orderplacementapiOptions);

    var placeorder = http.request(orderplacementapiOptions,function(res){
    // Return the Order Placement Response Status Code
    console.log("\n"+"Order Placement API Response Status Code",res.statusCode);
    res.on('data',function(data){
    console.log("\n"+"API Response"+"\n");
    process.stdout.write(data);
      // var orderresponse = JSON.parse(Buffer.concat(data).toString);

    // Order Placement Response JSON i.e. "data", will contain =
    // 1. If Order Placement Is Successfull or Not and
    // 2. What is the URL of the File Generated for Invoices for the Order Placed
    var orderresponse = JSON.parse(data);
    console.log("\n"+"Placed Order Response"+orderresponse);
    // console.log(orderresponse.isOrderPlacementSuccessful);
    // console.log(orderresponse.invoiceFileURL);

    // TODO: Perform the below Mentioned steps only when the Order Placement is Successfull
    var global = this;
    var updatedFileName="";
    var updatedInvoiceHTML = "";
    var updatedFilePath = "";

    // This HTML Code is used to replace the <div> with the <div> containing Print Button to Print Invoices
    // var updatedprintInvoiceButtonHTML = '<div class="printInvoice"><input type="button" class="btn btn-primary" value="Print Invoice" id="PrintInvoicebtn"></div>'

    console.log("\n"+"About to read the file received from server at"+orderresponse.invoiceFileURL);

      // Read the Invoice File as Received from the Server at the Location received in the Response of Place Order API
    function ReadInvoiceHTML(ofileURL,callback)
    {

    // Read the Invoice HTML file
    fs.readFile(ofileURL,'utf-8',function(err,data)
    {
      if(err) throw err;

      // This HTML Code is used to replace the <div> with the <div> containing Print Button to Print Invoices
      var updatedprintInvoiceButtonHTML = '<div class="printInvoice"><input type="button" class="btn btn-primary" value="Print Invoice" id="PrintInvoicebtn"></div>'

      // Replace the existing HTML template of Invoice as created by server with the updated HTML for Print button
      this.updatedInvoiceHTML = data.replace('<div class="printInvoice"></div>',updatedprintInvoiceButtonHTML);

      callback(this.updatedInvoiceHTML)
      });
      }

      // Use the data received after replacing the Template and create a New File
      function UpdateInvoiceHTML(ofileURL)
      {
        // Step 1- Define a New Name for the File where Invoices will be displayed
        // Lets First define the New Name for the Updated Invoice Template
        var originalFileName = ofileURL.split(".");
        // Fetched FileName Only from Complete Path of the location received from Server
        var filename = originalFileName[0].split("\\")[3];

        console.log("This is the Name of File that was created at the Latest by Server"+filename);
        // Add "U" in the name of the file
        this.updatedFileName = filename+"U"+".html";
        // Define the Path for the Newly created file
        this.updatedFilePath = path.join(__dirname, '/Invoices/'+this.updatedFileName);

        console.log
        (
        "\n"+
        "Created the New Name for the File to Distinguish the one received by server and the One Updated by us like this"+
        "\n"+
        this.updatedFileName
        );

        // Step 2- Call the ReadInvoiceHTML function to replace the content and return the Updated content
        ReadInvoiceHTML(ofileURL,function(data){
        fs.writeFile(this.updatedFilePath,data,'utf-8',function(err){
        if(err) throw err;
        // console.log("\n"+data+"\n");
        });
        });
        // Return the New File Name so as to Open it in a Seperate Window
        return this.updatedFileName;
        }

      // Create Browser Window
      var finalFileName = UpdateInvoiceHTML(orderresponse.invoiceFileURL);
      console.log(finalFileName);

      invoiceWindow = browserwindowgeneratormodule.generateNewBrowserWindow
                        (
                          path.join(__dirname, '/Invoices/'+finalFileName),
                          800,
                          600,
                          __dirname+'/img/jug1.jpg',
                          'file:',
                          true
                        );

      // Setting Up the Time Out
      setTimeout(()=>{invoiceWindow},1500);

      invoiceWindow.once('ready-to-show',()=>
      {
            invoiceWindow.show();
      });

      var value="Window Loaded error";
      console.log("\n"+"Inside Main.js"+value);

      //---------- Please Do Not Remove this code ---------
      // invoicewin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
      // // Load Invoice.html
      // setTimeout(()=>{
      // invoicewin.loadURL(url.format({
      // pathname: path.join(__dirname, '/Invoices/'+finalFileName),
      // protocol: 'file:',
      // slashes: true
      // }));
      // },1000)
      // // Took Ref : https://github.com/electron/electron/issues/5107
      //
      // invoicewin.once('ready-to-show', () => {
      //
      // invoicewin.show();
      // });
      // -------------Please Do Not Remove this code Untill Here-----------------

});

});
  // Provide the Request Body JSON here for Placing the Order
  placeorder.write(JSON.stringify(samplejson));
  // Completing the API Call
  placeorder.end();
  // In case of any error
  placeorder.on('error',function(e){
    console.log("\n"+"Some Error Occured While making a Call to API"+e);
  });

});

// ------------------------------------ Load Order Management Page ----------------------------
ipc.on('LoadOrderManagementPage',function(event,args)
{
orderManagementWindow = browserwindowgeneratormodule.generateNewBrowserWindow
                        (
                          path.join(__dirname, '/OrderManagement/placeorder.html'),
                          800,
                          600,
                          __dirname+'/img/jug1.jpg',
                          'file:',
                          true
                        );

// // Create Browser Window For Order Management Page
// ordermanagementwin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
// // Load contextmenu.html
// ordermanagementwin.loadURL(url.format({
// pathname: path.join(__dirname, '/OrderManagement/placeorder.html'),
// protocol: 'file:',
// slashes: true
// }));

orderManagementWindow.once('ready-to-show', () => { //when the new window is ready, show it up
orderManagementWindow.show()
});

orderManagementWindow.on('closed', function() { //set new window to null when we're done
orderManagementWindow = null
});

getMenuItemsWindow.close(); //close the selectOptins window(the second window)

});

// ------------------------------------ Load Transaction Management Page ----------------------------
ipc.on('LoadTransactionManagementPage',function(event,args){

  transactionmanagementWindow = browserwindowgeneratormodule.generateNewBrowserWindow
                                (
                                  path.join(__dirname, '/TransactionManagement/AddNewTransaction.html'),
                                  800,
                                  600,
                                  __dirname+'/img/jug1.jpg',
                                  'file:',
                                  true
                                );
//     // Create Browser Window For Transaction Management Page
//     transactionmanagementwin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
//     // Load contextmenu.html
//     transactionmanagementwin.loadURL(url.format({
// pathname: path.join(__dirname, '/TransactionManagement/AddNewTransaction.html'),
// protocol: 'file:',
// slashes: true
// }));

transactionmanagementWindow.once('ready-to-show', () => { //when the new window is ready, show it up
transactionmanagementWindow.show()
});

transactionmanagementWindow.on('closed', function() { //set new window to null when we're done
transactionmanagementWindow = null
});

getMenuItemsWindow.close();  //close the selectOptins window(the second window)

});

// ------------------------------------ Load Stock Management Page ----------------------------
ipc.on('LoadBalanceSheetManagementPage',function(event,args)
{

 balancesheetMgtWindow =  browserwindowgeneratormodule.generateNewBrowserWindow
                              (
                                path.join(__dirname, '/BalanceManagement/balancesoptions.html'),
                                800,
                                600,
                                __dirname+'/img/jug1.jpg',
                                'file:',
                                true
                              );

// // Create Browser Window For BalanceSheet Management Page
// balancesheetMgtwin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
// // Load contextmenu.html
// balancesheetMgtwin.loadURL(url.format({
// pathname: path.join(__dirname, '/BalanceManagement/balancesoptions.html'),
// protocol: 'file:',
// slashes: true
// }));

balancesheetMgtWindow.once('ready-to-show', () => { //when the new window is ready, show it up
balancesheetMgtWindow.show()
});

balancesheetMgtWindow.on('closed', function() { //set new window to null when we're done
balancesheetMgtWindow = null
});

getMenuItemsWindow.close(); //close the selectOptins window(the second window)

});

// ------------------------------------ Load Stock Management Page ----------------------------
ipc.on('LoadStockManagementPage',function(event,args)
{

     stockmanagementWindow = browserwindowgeneratormodule.generateNewBrowserWindow
                                      (
                                        path.join(__dirname, '/StockManagement/stockmanagement.html'),
                                        800,
                                        600,
                                        __dirname+'/img/jug1.jpg',
                                        'file:',
                                        true
                                      )

        // // Create Browser Window For Stock Management Page
        // stockmanagementwin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
        // // Load contextmenu.html
        // stockmanagementwin.loadURL(url.format({
        // pathname: path.join(__dirname, '/StockManagement/stockmanagement.html'),
        // protocol: 'file:',
        // slashes: true
        // }));

      //when the window is ready, show it up
      stockmanagementWindow.once('ready-to-show', () => {
      stockmanagementWindow.show()
      });

      stockmanagementWindow.on('closed', function() {
      stockmanagementWindow = null
      });

      getMenuItemsWindow.close(); //close the Menu Items window(the second window)

      });

// ------------------------------- Check Whether the Items is in Stock or Not ? -----------------
ipc.on('checkItemInStock',function(event,args){
  console.log("\n"+"Product Id for the Searched Product is :- "+args[0]);

  var inventoryapiOptions = {
    host: 'localhost',
    port: 49805,
    path: '/api/ItemStockCheck/'+args[0],
    method: 'GET',
    headers: {}
  };

  var getinventorydetails = http.request(inventoryapiOptions,function(res)
  {
    console.log("\n"+"Inventory API Response Status Code",res.statusCode);
    res.on('data',function(data){
      console.log("\n"+'API Response');
      process.stdout.write(data);
      stockmanagementWindow.webContents.send('api response',data);
      });
  });

  getinventorydetails.end();
  getinventorydetails.on('error',function(e)
  {
    console.log("\n"+'Some Error Occured While making a Call to API'+e);
  });
});

// Transaction Management based API Calls --------------------------------------------------------------------------------
ipc.on('addNewTransaction',function(event,args){

  var transactionJSON = JSON.stringify({

    "TransactionId": parseInt(args[0]),
    "TransactionDate": args[1],
    "TransactionAccountNo": parseInt(args[2]),
    "TransactionType": args[3],
    "TransactionDescription": args[4],
    "TransactionAmount": parseFloat(args[5]),
    "BookEntryDate": args[6]
  });

  console.log("\n"+" Transaction JSON Passed to the API is : -",transactionJSON);
  var addnewTransactionOptions = {
    host : 'localhost',
    port: 49805,
    path: '/api/AddNewTransaction',
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Content-Length' : Buffer.byteLength(transactionJSON)
    }
  };

  var addnewTransaction = http.request(addnewTransactionOptions,function(res){
    console.log("\n"+"Add New Transaction API Response",res.statusCode);
    res.on('data',function(data)
    {
      console.log("\n"+"Add New Transaction API Response");
      process.stdout.write(data);
    });

  });

  addnewTransaction.write(transactionJSON);
  addnewTransaction.end();
  addnewTransaction.on('error',function(e){
      console.log("\n"+"Some Error Occured in API Call"+"\n"+e);
  });

});

// ------------------------------- Create Trial Balance -----------------
ipc.on('ComputeTrialBalanceSheet',function(event,args){

  var prepareTrialBalanceReportOptions =
  {
    host: 'localhost',
    port: 49805,
    path: '/api/PrepareTrialBalance',
    method: 'GET',
    headers: {}
  };

  var createTrialBalanceReport = http.request(prepareTrialBalanceReportOptions,function(res)
  {
    console.log("\n"+"Create Trial Balance API Response Status Code",res.statusCode);
    res.on('data',function(data){
      console.log("\n"+'API Response');
      process.stdout.write(data);
    });
  });

  createTrialBalanceReport.end();
  createTrialBalanceReport.on('error',function(e){
    console.log("\n"+'Some Error Occured While making a Call to API'+e);
  });
});

// When print button is clicked in the Invoice DOM
ipc.on('print',function(event,args){
    // TODO: In complete : Need to Find the Solution
    console.log("Inside Main.js for Printing");
    //printer.print("Sample");
});
// endregion : Order Placement

// Todo : Move ths code to seperate File
// ------------------------------------ Move to Context Menu Page ----------------------------
ipc.on('gettocontextmenu',function(event,args){

  console.log("\n"+"Going to Move back to the Context Menu");
   contextmenuBrowserWindow = browserwindowgeneratormodule.generateNewBrowserWindow
                                  (
                                    path.join(__dirname, '/ContextMenu/contextmenu.html'),
                                    800,
                                    600,
                                    __dirname+'/img/jug1.jpg',
                                    'file:',
                                    true
                                  );
  // // Create Browser Window
  // selectOptionswin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
  // // Load contextmenu.html
  // selectOptionswin.loadURL(url.format({
  //       pathname: path.join(__dirname, '/ContextMenu/contextmenu.html'),
  //       protocol: 'file:',
  //       slashes: true
  // }));

        contextmenuBrowserWindow.once('ready-to-show', () => {
          //when the new window is ready, show it up
        contextmenuBrowserWindow.show()
      });

        contextmenuBrowserWindow.on('closed', function() { //set new window to null when we're done
        contextmenuBrowserWindow = null
      });

        stockmanagementWindow.close();
      });



// Run create Window Function
app.on('ready',createWindow);

// Quit when all windows are closed
app.on('window-all-closed',()=>{
  if(process.platform !== 'darwin')
  {
    app.Quit();
  }
});
