const Migrations = artifacts.require("SpaceACH");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
