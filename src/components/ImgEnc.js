const CryptoJS = require("crypto-js");

const encryptPassKeyword = CryptoJS.lib.WordArray.random(16);
const encryptPassImage = CryptoJS.lib.WordArray.random(16);
const salt = CryptoJS.lib.WordArray.random(16);
const iv = CryptoJS.lib.WordArray.random(16);

const symmetricKeywordKey = CryptoJS.PBKDF2(encryptPassKeyword, salt, {
    keySize: 256 / 32
});

const symmetricImageKey = CryptoJS.PBKDF2(encryptPassImage, salt, {
    keySize: 256 / 32
})

var cryptoMethods = {
    imageEncryption: function (fileBuffer) {

        var encryptBuffer = CryptoJS.enc.Utf8.parse(fileBuffer);
        var encryptedFile = CryptoJS.AES.encrypt(encryptBuffer, symmetricImageKey, {
            iv: iv, //offset
            mode: CryptoJS.mode.CBC, //encryption mode
            padding: CryptoJS.pad.Pkcs7 //padding mode
        })

        var convEncFile = CryptoJS.enc.Utf8.parse(encryptedFile)
        return cryptoMethods.convertWordArrayToUint8Array(convEncFile);
    },

    imageDecryption: function (fileCipher) {

        var encryptCipher = CryptoJS.enc.Utf8.parse(fileCipher);
        var toDecFile = CryptoJS.enc.Base64.stringify(encryptCipher);
        var decryptedFile = CryptoJS.AES.decrypt(toDecFile, symmetricImageKey, {
            iv: iv, //offset
            mode: CryptoJS.mode.CBC, //encryption mode
            padding: CryptoJS.pad.Pkcs7 //padding mode
        });

        //return decryptedFile.toString();
        var decryptedFileString = decryptedFile.toString();
        return decryptedFileString
    },

    tagEncryption: function(labels){
        var labelBuffer = CryptoJS.enc.Utf8.parse(labels)
        var encryptedLabels = CryptoJS.AES.encrypt(labelBuffer, symmetricKeywordKey, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })

        return encryptedLabels.toString();
    },

    convertWordArrayToUint8Array: function (wordArray) {
        var len = wordArray.words.length,
            u8_array = new Uint8Array(len << 2),
            offset = 0, word, i
            ;
        for (i = 0; i < len; i++) {
            word = wordArray.words[i];
            u8_array[offset++] = word >> 24;
            u8_array[offset++] = (word >> 16) & 0xff;
            u8_array[offset++] = (word >> 8) & 0xff;
            u8_array[offset++] = word & 0xff;
        }
        return u8_array;
    },
}

export default cryptoMethods;
