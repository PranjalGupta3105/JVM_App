const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const url = require('url');


  var windowObj;
  module.exports.generateNewBrowserWindow = function(filePath, windowWidth, windowHeight,windowIcon, windowProtocol, windowSlashes)
  {
    var windowObject = createWindow(filePath, windowWidth, windowHeight,windowIcon, windowProtocol, windowSlashes);

    console.log("\n"+"Inside Generate New Browser Window"+windowObject);
    return windowObject;
  }

  function createWindow(filePath, windowWidth, windowHeight,windowIcon, windowProtocol, windowSlashes){

  this.windowObj = new BrowserWindow({width:windowWidth,height:windowHeight,icon:windowIcon});

  this.windowObj.loadURL(url.format({
      pathname: filePath,
      protocol: windowProtocol,
      slashes: windowSlashes
    }));

  console.log("\n"+"Inside Create Window"+this.windowObj);
  return this.windowObj
  }

//module.exports = generateNewBrowserWindow()
