const bcrypt = require("bcrypt");

const { v4: uuidV4 } = require("uuid");

const saltRounds = 10;
password="aneez"
var encryptedPassword
async function myfunction(){
    encryptedPassword = await bcrypt.hash(password, saltRounds);
    console.log(encryptedPassword)
}

    myfunction();
// const { v4: uuidV4 } = require("uuid");
// var uuidgiven=uuidV4();
// console.log(uuidgiven)