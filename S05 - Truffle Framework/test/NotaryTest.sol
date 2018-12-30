pragma solidity >=0.4.24 <0.6.0;

import "truffle/Assert.sol";

import "truffle/DeployedAddresses.sol";
import "../contracts/Notary.sol";

contract NotaryTest {
  function testAddAndRead() public {
    Notary notaryContract = Notary(DeployedAddresses.Notary());
    notaryContract.addEntry(0x193C167E2B336B32356F17009C923C4CD33AC8E3F62BAD1384E8A049F77FD295, "test", "test");

    string memory fileName;
    uint timestamp;
    string memory comment;
    address sender;
    (fileName, timestamp, comment, sender) = notaryContract.entrySet(0x193C167E2B336B32356F17009C923C4CD33AC8E3F62BAD1384E8A049F77FD295);
    Assert.equal(fileName, "test", "Test should be the filename");

    Assert.equal(sender, address(this), "The same address for this caller should be the address who created the hash");
  }

  function testExceptions() public {
    address notaryAddress = address(DeployedAddresses.Notary());
    //OLD, since Version 0.5.0 look at the below lines! bool transactionSentSuccessful = notaryAddress.call(bytes4(keccak256("entrySet(bytes32)")), 0x193C167E2B336B32356F17009C923C4CD33AC8E3F62BAD1384E8A049F77FD296);
    
    bool transactionSentSuccessful;
    bytes memory returnValue;
    (transactionSentSuccessful,returnValue) = notaryAddress.call(abi.encodeWithSignature("entrySet(bytes32)", 0x193C167E2B336B32356F17009C923C4CD33AC8E3F62BAD1384E8A049F77FD296));
    Assert.equal(transactionSentSuccessful, false, "The Transaction should fail");
  }
}
