//const request = require('request');
// var path = require('path');
const http = require('http');


module.exports.getRequests = function()
{

};

module.exports.postRequests = function (hostname,portaddress,apipath,apimethod,apiheaders,apiname)
{

  console.log("I am able to Hit method For API call");

  var apiOptions =
  {
    host: hostname,
    port: portaddress,
    path: apipath,
    method: apimethod,
    headers: apiheaders
  };

  console.log("\n"+"API Options"+apiOptions);

  var responsedata  = "";
  callback = function(res)
  {
    console.log("\n"+apiname+"Returned Status Code : "+res.statusCode);
    res.on('data',function(data)
    {
      // console.log("\n"+"Data as Received from the API"+"\n");
      // //process.stdout.write(data);
      // console.log("\n");
      // return data;
      responsedata += data;
    });

    res.on('end', function () {
    console.log("This is Response Data"+responsedata);
    // your code here if you want to use the results !
  });
}
    var apirequest = http.request(apiOptions, callback).end();

    apirequest.on('error',function(e){
    console.log(
        "\n"+"Some Error Occured While making a Call to API "+apiname
        +
        "\n"+"Following is the Exception Raised"+e);

    });
    console.log("\n"+"-------------------Value Set in Response Data-------------------"+"\n"+apirequest.data);
  return apirequest.data;
};
