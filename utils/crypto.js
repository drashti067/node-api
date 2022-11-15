require('dotenv').config();
const CryptoJS = require("crypto-js");

const encKey = process.env.CRYPTO_KEY;

//Encrypting text
exports.encrypt = (text) => {
    const cipher = CryptoJS.AES.encrypt(text, encKey).toString();
    return cipher;
}

// Decrypting text
exports.decrypt = (text) => {

    var bytes  = CryptoJS.AES.decrypt(text, encKey);
    var dCipher = bytes.toString(CryptoJS.enc.Utf8);

    return dCipher;
}