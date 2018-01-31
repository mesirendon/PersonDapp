pragma solidity ^0.4.17;

contract Person {
  string public name;

  function setName(string _name) public {
    name = _name;
  }
}
