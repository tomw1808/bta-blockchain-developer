// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import notary_artifact from '../../../build/contracts/Notary.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Notary = contract(notary_artifact);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Notary.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      Notary.defaults({from: account});

    });
  },
  processSend: function() {
    /* easy version start */

    if(document.querySelector('#fileHash').value.length == 66) {
      var fileHash = document.querySelector('#fileHash').value;
      var fileName = document.querySelector('#fileName').value;
      var comment = document.querySelector('#comment').value;
      document.querySelector("#status").innerHTML = "";
      App.appendStatus("Sending Transaction ... ");

      Notary.deployed().then(instance => {
        return instance.addEntry(fileHash, fileName, comment, {gas: 3000000});

      }).then(res => {
        App.appendStatus(" [OK]<br />");
        App.appendStatus("Result-Object in console!");
        console.log(res);
      }).catch(error => {
        App.appendStatus(" [ERROR]<br />");
        App.appendStatus("Error in console!");
        console.error(error);
      })
    } else {
      console.error("Filehash length not 66 characters. Aborting.");
    }

    return false;
  },
  appendStatus: function(text) {
    document.getElementById("status").innerHTML = document.getElementById("status").innerHTML+" "+text;
  }
};

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);

    //updated metamask privacy mode
    //checkout https://vomtom.at/metamask-new-privacy-mode/
    try {
      await window.ethereum.enable(); // get permission to access accounts
    } catch (error) {
      console.error(error);
    }
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
    );
  }

  App.start();
});
