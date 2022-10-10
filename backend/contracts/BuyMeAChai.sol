// SPDX-License-Identifier: MIT

pragma solidity 0.8.13; 

contract BuyMeAChai {
  event NewChai(
    address indexed from,
    uint256 timestamp,
    string name,
    string message
  );

  struct Chai {
    address from;
    uint256 timestamp;
    string name;
    string message;
  }

  address payable owner;

  Chai[] chais;

  constructor() {
    owner = payable(msg.sender);
  }

  function getAllChai() public view returns (Chai[] memory) {
    return chais;
  }

  function buyChai(string memory _name, string memory _message) public payable {
    require(msg.value > 0, "error: can't buy chai for free!");

    chais.push(Chai(
      msg.sender,
      block.timestamp,
      _name,
      _message
    ));

    emit NewChai(
      msg.sender,
      block.timestamp,
      _name,
      _message
    );
  }

  function withdraw() public {
    require(owner.send(address(this).balance));
  }
}
