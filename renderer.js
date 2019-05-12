const electron = require('electron');
const ipc = electron.ipcRenderer;

const loginBtn = document.getElementById('loginbtn');
loginBtn.addEventListener('click', function(){
    var loginId = document.getElementById("UserName").value;
    var password = document.getElementById("Password").value;
    ipc.send('authenticateLogin',[loginId,password]);
    // AuthenticateUser(loginId,password)
})



function AuthenticateUser(loginId,password){

  console.log("I am able to reach the method User Entered the UserName as: "+loginId+" and the Password as: "+password);
}

// document.querySelector('#loginbtn').addEventListener('click', () => {
//     var loginId = document.getElementById("UserName").value;
//     var password = document.getElementById("Password").value;
//     AuthenticateUser(loginId,password)
// })
