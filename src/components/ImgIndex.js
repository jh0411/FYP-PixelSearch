var imageIndexTable = [];
var encryptImageTable = [];
var row = 0;
var column = 0;
var row1 = 0;
var column1 = 0;

var indexMethods = {

    addImgIDHash: function(imgLabel, imgIDHash){

        imageIndexTable[row] = [imgLabel, imgIDHash]
        //console.table(imageIndexTable)

        column = imageIndexTable.length;
        console.timeStamp(column)
        row += 1;
        return imageIndexTable;
    },

    addEncryptImgHash: function (encTag, imgHash){

        encryptImageTable[row1] = [encTag, imgHash]
        console.table(encryptImageTable)

        column = encryptImageTable.length;
        console.timeStamp(column1)
        row1 += 1;
        return encryptImageTable;
    },

    searchImg: function(imgLabel){
        var isFound = false;
        for(var i = 0; !isFound && i < imageIndexTable.length; i++){
            if(imgLabel === imageIndexTable[i][0]){
                console.log("Image data found: ", "https://ipfs.infura.io/ipfs/" + imageIndexTable[i][1])
                sessionStorage.setItem("retrieveLink", "https://ipfs.infura.io/ipfs/" + imageIndexTable[i][1]);
                isFound = true;
            }
        }
        if (isFound){
        }
        else{
            console.log("Image data not found!")
        }
    }
}

export default indexMethods;
