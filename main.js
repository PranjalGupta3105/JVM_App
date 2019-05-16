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
var http = require('http');


// init win - this is Global reference to Windows Object, if we do not create this,
// the window will be closed automatically when javascript object is Garbage Collected
let win,selectOptionswin;

function createWindow(){
  // Create Browser Window
  win = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
  // Load Index.html
  win.loadURL(url.format({
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  slashes: true
}));

// Open devtools Do Not Open Dev Tools Untill Dying Emergency
// win.webContents.openDevTools();

win.on('closed',()=>{
  win = null;
});

}

ipc.on('authenticateLogin',function(event,args){
  console.log("\n"+"This is my LoginId:- "+args[0]+" and this is the Password:- "+args[1]);
  // ------------------------------- Defining Authentication Header -----------------------
  var authenticationHeader = "Basic " + new bufferFrom(args[0] +':'+args[1]).toString("base64");
  // -------------------------------------- Get Token --------------------------------------
  var tokenapiOptions = {
    host: 'localhost',
    port: 49805,
    path: '/Token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : authenticationHeader
    }
  };

  var getToken = http.request(tokenapiOptions,function(res){
    console.log("\n"+"Token API Response Status Code",res.statusCode);
    res.on('data',function(data){
      console.log("\n"+'API Response');
      process.stdout.write(data);
      if(data != null){
        // Create Browser Window
        selectOptionswin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
        // Load contextmenu.html
        selectOptionswin.loadURL(url.format({
        pathname: path.join(__dirname, '/ContextMenu/contextmenu.html'),
        protocol: 'file:',
        slashes: true
        }));
        selectOptionswin.once('ready-to-show', () => { //when the new window is ready, show it up
        selectOptionswin.show()
        })

        selectOptionswin.on('closed', function() { //set new window to null when we're done
        selectOptionswin = null
        })

        win.close(); //close the login window(the first window)

      }
    });
  });

  getToken.end();
  getToken.on('error',function(e){
    console.log("\n"+'Some Error Occured While making a Call to API'+e);
  });

});
// ---------------------------------------- Place Order ------------------------------------
ipc.on('PlaceOrder',function(event,args){

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

console.log(orderplacementapiOptions);

  var placeorder = http.request(orderplacementapiOptions,function(res){
    console.log("\n"+"Order Placement API Response Status Code",res.statusCode);
    res.on('data',function(data){
      console.log("\n"+'API Response');
      process.stdout.write(data);
   //     if(data != null){
  //       // Create Browser Window
  //       selectOptionswin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
  //       // Load contextmenu.html
  //       selectOptionswin.loadURL(url.format({
  //       pathname: path.join(__dirname, '/ContextMenu/contextmenu.html'),
  //       protocol: 'file:',
  //       slashes: true
  //       }));
  //       selectOptionswin.once('ready-to-show', () => { //when the new window is ready, show it up
  //       selectOptionswin.show()
  //       })
  //
  //       selectOptionswin.on('closed', function() { //set new window to null when we're done
  //       selectOptionswin = null
  //       })
  //
  //       win.close(); //close the login window(the first window)
  //
  //     }
  //   });
  // });
});
// placeorder.write(JSON.stringify(args));
});

  placeorder.end();
  placeorder.on('error',function(e){
    console.log("\n"+'Some Error Occured While making a Call to API'+e);
  });

});
// ------------------------------------ Move to Context Menu Page ----------------------------
ipc.on('gettocontextmenu',function(event,args){
console.log("\n"+"Going to Move back to the Context Menu");
        // Create Browser Window
        selectOptionswin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
        // Load contextmenu.html
        selectOptionswin.loadURL(url.format({
        pathname: path.join(__dirname, '/ContextMenu/contextmenu.html'),
        protocol: 'file:',
        slashes: true
        }));

        selectOptionswin.once('ready-to-show', () => {
          //when the new window is ready, show it up
        selectOptionswin.show()
      });

        selectOptionswin.on('closed', function() { //set new window to null when we're done
        selectOptionswin = null
      });

        stockmanagementwin.close();
      });

// ------------------------------------ Load Order Management Page ----------------------------
      ipc.on('LoadOrderManagementPage',function(event,args){

              // Create Browser Window For Stock Management Page
              ordermanagementwin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
              // Load contextmenu.html
              ordermanagementwin.loadURL(url.format({
              pathname: path.join(__dirname, '/OrderManagement/placeorder.html'),
              protocol: 'file:',
              slashes: true
              }));

              ordermanagementwin.once('ready-to-show', () => { //when the new window is ready, show it up
              ordermanagementwin.show()
              });

              ordermanagementwin.on('closed', function() { //set new window to null when we're done
              ordermanagementwin = null
              });

              selectOptionswin.close(); //close the selectOptins window(the second window)

            });

// ------------------------------------ Load Stock Management Page ----------------------------
ipc.on('LoadStockManagementPage',function(event,args){

        // Create Browser Window For Stock Management Page
        stockmanagementwin = new BrowserWindow({width:800, height:600,icon:__dirname+'/img/jug1.jpg'});
        // Load contextmenu.html
        stockmanagementwin.loadURL(url.format({
        pathname: path.join(__dirname, '/StockManagement/stockmanagement.html'),
        protocol: 'file:',
        slashes: true
        }));

        stockmanagementwin.once('ready-to-show', () => { //when the new window is ready, show it up
        stockmanagementwin.show()
        });

        stockmanagementwin.on('closed', function() { //set new window to null when we're done
        stockmanagementwin = null
        });

        selectOptionswin.close(); //close the selectOptins window(the second window)

      });

// ------------------------------- Check Whether the Items is in Stock or Not ? -----------------
ipc.on('checkItemInStock',function(event,args){
  console.log("\n"+"Product Id for the Searched Product is :- "+args[0]);
  // -------------------------------------- Get Token --------------------------------------
  var inventoryapiOptions = {
    host: 'localhost',
    port: 49805,
    path: '/api/ItemStockCheck/'+args[0],
    method: 'GET',
    headers: {}
  };

  var getinventorydetails = http.request(inventoryapiOptions,function(res){
    console.log("\n"+"Inventory API Response Status Code",res.statusCode);
    res.on('data',function(data){
      console.log("\n"+'API Response');
      process.stdout.write(data);
      stockmanagementwin.webContents.send('api response',data);
    });
  });

  getinventorydetails.end();
  getinventorydetails.on('error',function(e){
    console.log("\n"+'Some Error Occured While making a Call to API'+e);
  });
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
