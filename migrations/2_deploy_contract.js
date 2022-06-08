const ImgHash = artifacts.require("ImgHash");

module.exports = function(deployer) {
  deployer.deploy(ImgHash);
};

// const ImgStorage = artifacts.require("ImgStorage");

// module.exports = function(deployer) {
//   deployer.deploy(ImgStorage);
// };

//we are creating the new variable and truffle uses this artifacts to find the ID called "" to represent the smart contract and deploy it to the blockchain