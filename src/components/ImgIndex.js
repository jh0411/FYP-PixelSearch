var indexTable = [];
var searchIndex = [];
var imageIndexTable = [];
var row = 0;
var column = 0;

var indexMethods = {

    addImgIDHash: function(imgLabel, imgIDHash){

        indexTable[row] = imgIDHash
        searchIndex[row] = imgLabel

        //console.table(searchIndex)
        //console.table(indexTable)

        imageIndexTable[row] = [imgLabel, imgIDHash]
        console.table(imageIndexTable)

        column = imageIndexTable.length;
        console.timeStamp(column)
        row += 1;
        return imageIndexTable;
    },

    searchImg: function(imgLabel){
        var isFound = false;
        for(var i = 0; !isFound && i < imageIndexTable.length; i++){
            if(imgLabel === imageIndexTable[i][0]){
                console.log("Image data found: ", "https://ipfs.infura.io/ipfs/" + imageIndexTable[i][1])
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
