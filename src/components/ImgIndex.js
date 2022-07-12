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

        column1 = encryptImageTable.length;
        console.timeStamp(column1)
        row1 += 1;
        return encryptImageTable;
    },

    searchImg: function(imgLabel){
        var isFound = false;
        var timeBefore = performance.now()
        for(var i = 0; i < imageIndexTable.length; i++){
            if(imgLabel === imageIndexTable[i][0]){
                console.log("Image data found: ", "https://ipfs.infura.io/ipfs/" + imageIndexTable[i][1])
                sessionStorage.setItem("retrieveLink", "https://ipfs.infura.io/ipfs/" + imageIndexTable[i][1]);
                isFound = true;

                const anchor = document.createElement("a");
                anchor.href = 'https://ipfs.infura.io/ipfs/' + imageIndexTable[i][1];
                anchor.download = imageIndexTable[i][1];
        
                document.body.appendChild(anchor);
                anchor.setAttribute("target", "_blank");
                anchor.click();
                document.body.removeChild(anchor);
            }
        }
        var timeAfter = performance.now()
        if (isFound){
            console.log("Image is found in " + (timeAfter - timeBefore) + " ms");
        }
        else{
            window.alert("Image data not found!")
        }
    }
}

export default indexMethods;
