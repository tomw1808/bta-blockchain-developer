pragma solidity >=0.4.24 <0.6.0;

contract MyContract {

    mapping(uint => bool) public myMapping;

    function writeSomethingInTheMapping(uint _myInt) public {
        myMapping[_myInt] = true;
    }

}
