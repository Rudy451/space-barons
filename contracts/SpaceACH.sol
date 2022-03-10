// SPDX-License-Identifier: U
pragma solidity ^0.8.11;

contract SpaceACH {

  address payable public owner;
  mapping(string => address payable) playerProfiles;
  mapping(address => bool) verifyPlayer;

  struct GameData {
      uint playerCount;
      uint potAmount;
  }

  GameData Game;

  constructor() payable {
    owner = payable(address(this));
    Game = GameData(0, 20);
  }

  function participantDepositFunds(string memory player) public payable {
    require(Game.playerCount < 2);
    require(verifyPlayer[playerProfiles[player]] != true);
    require(msg.value >= Game.potAmount);
    owner.call{value: msg.value};
    Game.playerCount = Game.playerCount + 1;
    playerProfiles[player] = payable(msg.sender);
    verifyPlayer[msg.sender] = true;
  }

  function winnerWithdrawFunds(string memory player) public payable {
    require(owner == address(this));
    require(Game.playerCount == 2);
    require(verifyPlayer[playerProfiles[player]]);
    payable(playerProfiles[player]).call{value: payable(owner).balance};
  }

  receive() external payable {}
}
