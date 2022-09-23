// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/hardhat/console.sol";

contract Chai {
  uint256 totalChai;
  address payable public owner;

  event NewChai(
    address indexed from,
    uint256 timestamp,
    string message,
    string name
  );

  constructor() payable {
    console.log('Chai contract!');
    owner = payable(msg.sender);
  }

  struct Cup {
    address sender;
    string name;
    string message;
    uint256 timestamp;
  }

  Cup[] cups;

  function getAllChai() public view returns (Cup[] memory) {
    return cups;
  }

  function getTotalChai() public view returns (uint256) {
    console.log("total chai received: ", totalChai);

    return totalChai;
  }

  function buyChai(string memory _name, string memory _message, uint256 _amount) public payable {
    uint256 cost = 0.001 ether;
    require(_amount <= cost, 'insufficient funds');

    totalChai += 1;

    cups.push(Cup(msg.sender, _name, _message, block.timestamp));

    (bool success, ) = owner.call{ value: _amount }("");
    require(success, 'failed to send money');

    emit NewChai(msg.sender, block.timestamp, _message, _name);
  }
}
