pragma solidity ^0.4.24;

contract MyContract {

   mapping(uint => bool) someMapping;
   mapping(address => uint) balanceOfAddress;

    struct MyStruct {
        uint timestamp;
        uint counter;
    }

    mapping(address => MyStruct) public myMapping;

    function myFunction() public {
        myMapping[msg.sender].timestamp = now;
        myMapping[msg.sender].counter++;
    }

}
