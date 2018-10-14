var Notary = artifacts.require("./Notary.sol");

module.exports = function(deployer) {
  deployer.deploy(Notary);
}
