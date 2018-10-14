pragma solidity ^0.4.24;

contract MyContract {
    uint public myVarOne;
    uint public myVarTwo;
    bool writeable;

    modifier mustBeWriteable() {
        require(writeable);
        _;
    }

    function setWriteable(bool _writeable) public {
        writeable = _writeable;
    }

    function updateMyVar(uint _myVar) public mustBeWriteable {
       myVarOne = _myVar;
    }

    function updateMyVar2(uint _myVar) public mustBeWriteable {
        myVarTwo = _myVar;
    }

}
