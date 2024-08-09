require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();


const { PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  networks: {
    ephemery: {
      url: 'https://otter.bordel.wtf/erigon',
      accounts: [PRIVATE_KEY]
    }             
  }
};
