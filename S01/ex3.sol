pragma solidity >=0.4.24 <0.6.0;

contract MyContract {

    uint256 public myVar;

    function setMyVar(uint256 _myVar) public {
        myVar = _myVar;
    }

    function getMyVar() view public returns(uint256) {
        return myVar;
    }
}
