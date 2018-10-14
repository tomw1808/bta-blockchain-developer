// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import {
  default as Web3
} from 'web3';
import {
  default as contract
} from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import notary_artifact from '../../build/contracts/Notary.json'

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

    if (document.querySelector('#file').files.length > 0) {

      document.querySelector("#status").innerHTML = "";
      var file = document.querySelector('#file').files[0];
      App.appendStatus("Creating Hash...");
      createHash(file)
        .then(function(hash) {
          App.appendStatus(" [OK]<br />");

          //normalizing the hash
          if(hash[0] != "0" && hash[1] != "x") {
            hash = "0x"+hash;
          }


          var fileHash = hash;
          var fileName = file.name;
          var comment = document.querySelector('#comment').value;

          document.querySelector('#file').value = "";

          App.appendStatus("Sending Transaction ... ");

          return Notary.deployed().then(instance => {
            return instance.addEntry(fileHash, fileName, comment, {gas: 3000000});

          }).then(res => {
            App.appendStatus(" [OK]<br />");
            App.appendStatus("Result-Object in console!");
            console.log(res);
          })
          .catch(function(err) {
            App.appendStatus("ERROR: <br />"+err);
            console.error(err);
          });

        })
        .catch(function(err) {
          App.appendStatus("ERROR: <br />"+err);
          console.error(err);
        });

    } else {
      console.warn("There was no file selected!");
    }
    return false;
  },
  appendStatus: function(text) {
    document.getElementById("status").innerHTML = document.getElementById("status").innerHTML+" "+text;
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }

  App.start();
});


function createHash(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function() {
      var buffer = this.result;
      crypto.subtle.digest('SHA-256', buffer)
        .then(function(hash) {
          resolve(toHex(hash));
        })
        .catch(reject);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
function toHex(buffer) {
  var i, n, k, value, stringValue, padding, paddedValue;
  var hexCodes = [];
  var view = new DataView(buffer);
  for (i = 0, n = view.byteLength, k = Uint32Array.BYTES_PER_ELEMENT; i < n; i += k) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    value = view.getUint32(i);
    // toString(16) will give the hex representation of the number without padding
    stringValue = value.toString(16);
    // We use concatenation and slice for padding
    padding = '00000000';
    paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }
  // Join all the hex strings into one
  return hexCodes.join('');
}
