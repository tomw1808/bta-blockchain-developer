/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var HDWalletProvider = require("truffle-hdwallet-provider");

var seedPhrase = "oil tourist rare carpet smart that relax aunt endorse alert stairs disagree";


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: '*'
    },

 ropsten: {
     provider: function() {
       return new HDWalletProvider(seedPhrase,'https://ropsten.infura.io/6qo1JHa6k7N8U2qbJ2Lc')
     },
     network_id: '3',
     gas: 3000000,
     gasPrice: 10000000000,
   },
  }
};
