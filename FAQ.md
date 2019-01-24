# FAQ (Known Problems)

## Truffle 5.0.2 and Webpack 3 Updates

Truffle has recently updated to Version 5 and Webpack 2 got deprecated.

You see this in folders S06/L04 to S06/L09.

There are new commands:

Commands:

  Compile:              truffle compile
  Migrate:              truffle migrate
  Test contracts:       truffle test
  Run dev server:       cd app && npm run dev
  Build for production: cd app && npm run build

Please pay special attention to the `cd app && npm run dev`. Be aware that you can't run the Dev-Server from the root directory anymore.

### No Truffle-Contract included

The new truffle-webpack-box doesn't use truffle-contract anymore. This course heavily relies on Truffle-Contract though. If you still want to use truffle-contract in a truffle-webpack box then you have to 

`cd app && npm install --save truffle-contract`

### Bugfix in ethers

If you run into 

ERROR in ./node_modules/ethers/utils/web.js
Module not found: Error: Can't resolve 'xmlhttprequest' in 'C:\101Tmp\updates\app\node_modules\ethers\utils'

or 

ERROR in ./node_modules/ethers/providers/ipc-provider.js
Module not found: Error: Can't resolve 'net' in 'C:\101Tmp\updates\app\node_modules\ethers\providers'

then try to install a specific version of ethers: `npm install ethers@4.0.20`. The Version dependency of web3 is stating ethers@4.0.0-beta.1 which breaks functionality

## Remix and Solidity 0.5.0
Remix had some problems with the recent Solidity 0.5.0 update

We have updated the code so it works with Solidity 0.5.0 as well. You might want to look into 
https://solidity.readthedocs.io/en/v0.5.0/050-breaking-changes.html
and make sure your code is compliant.

I did a Video about this. Here it is: https://youtu.be/7CEnjRwSVlw

## MetaMask Private Mode
Soon comes Private Mode from MetaMask 
https://medium.com/metamask/introducing-privacy-mode-42549d4870fa

We're probably doing a video about this and then post it here.

UPDATE: Here is the video: https://youtu.be/hmAgZRMtSUM

## Geth Private Network
It's not directly related to this course, but if you start a private network with Geth and you want to start the miner then you also need to specify how many Miner-Threads you want:

   geth --datadir=./blockdata --rpc --mine --miner.threads=1 --miner.etherbase=0x54bA8e223De78
970061e9E9aa96E3BF3C6048fb8 --rpc

