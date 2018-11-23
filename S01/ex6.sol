pragma solidity >=0.4.24 <0.6.0;

contract MyContract {

    uint8 myUint8;
    int8 myInt8;

    uint myUint256;


    /**
     * Integer Division Example
     * */
    function divideIntegers() public pure returns(uint8) {
        uint8 five = 5;
        uint8 two = 2;
        return five/two;
    }


    function wrapAround() public pure returns(uint8) {
        uint8 zero = 0;
        zero--;
        return zero;
    }

    /**
     * Returns the balance in Wei.
     * 1 Ether = 10^18 Wei.
     * */
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function() public  payable {
           uint balance = msg.value;
    }

    function withdrawEverything() public {
        msg.sender.transfer(getBalance());
    }

}
