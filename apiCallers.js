//const request = require('request');
// var path = require('path');
const http = require('http');


// module.exports.getRequests = function(hostname,portaddress,apipath,apimethod,apiheaders,apiname,apifunctioncallback)
// {
//     console.log("\n"+"I am able to Hit method For API call"+"\n");
//
//     var apiOptions =
//     {
//       host: hostname,
//       port: portaddress,
//       path: apipath,
//       method: apimethod,
//       headers: apiheaders
//     };
//
// };


module.exports.apiRequests = function (hostname,portaddress,apipath,apimethod,apiheaders,apiname,requestbody,apifunctioncallback)
{

  console.log("\n"+"I am able to Hit method For API call"+"\n");

  var apiOptions =
  {
    host: hostname,
    port: portaddress,
    path: apipath,
    method: apimethod,
    headers: apiheaders
  };

  //console.log("\n"+"API Options"+apiOptions);

  var responsedata  = "";

  callback = function(res)
  {
    console.log("\n"+apiname+" Returned Status Code : "+res.statusCode);
    res.on('data',function(data)
    {
      responsedata += data;
    });

    res.on('end', function () {
    setResponseInApiCaller(responsedata)
  });
 }
    var apirequest = http.request(apiOptions, callback);
    apirequest.write(JSON.stringify(requestbody.toString()));
    apirequest.end();



    apirequest.on('error',function(e){
    console.log(
        "\n"+"Some Error Occured While making a Call to API "+apiname
        +
        "\n"+"Following is the Exception Raised"+e);

    });

    function setResponseInApiCaller(apiresponse){
      // Set the Response in the Call Back function defined in the method calling the apiCaller class
      apifunctioncallback(apiresponse);
    }
};
