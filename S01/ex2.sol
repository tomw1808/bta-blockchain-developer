pragma solidity ^0.4.24;

contract MyContract {
    
    uint256 myVar;
    
    function setMyVar(uint256 _myVar) public {
        myVar = _myVar;
    }
}