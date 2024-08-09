const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContractsDeployment", (m) => {

  const marketplace = m.contract("IFBmarketplace");

  return { marketplace };
});
