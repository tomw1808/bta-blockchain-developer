# FAQ (Known Problems)


## Remix and Solidity 0.5.0
Remix had some problems with the recent Solidity 0.5.0 update

We have updated the code so it works with Solidity 0.5.0 as well. You might want to look into 
https://solidity.readthedocs.io/en/v0.5.0/050-breaking-changes.html
and make sure your code is compliant.


## MetaMask Private Mode
Soon comes Private Mode from MetaMask 
https://medium.com/metamask/introducing-privacy-mode-42549d4870fa

We're probably doing a video about this and then post it here.

## Geth Private Network
It's not directly related to this course, but if you start a private network with Geth and you want to start the miner then you also need to specify how many Miner-Threads you want:

   geth --datadir=./blockdata --rpc --mine --miner.threads=1 --miner.etherbase=0x54bA8e223De78
970061e9E9aa96E3BF3C6048fb8 --rpc

