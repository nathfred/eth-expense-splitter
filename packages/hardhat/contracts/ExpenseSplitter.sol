// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ExpenseSplitter {
    address public owner;
    mapping(address => uint256) public balances;
    address[] public participants;
    bool public isWithdrawn;

    event ExpenseAdded(address indexed payer, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
        isWithdrawn = false;
    }

    function addExpense(address[] memory _participants) public payable {
        require(msg.value > 0, "Must send ETH");
        uint256 share = msg.value / _participants.length;
        for (uint256 i = 0; i < _participants.length; i++) {
            balances[_participants[i]] += share;
        }
        isWithdrawn = false;
        emit ExpenseAdded(msg.sender, msg.value);
    }

    function withdrawFunds() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No funds to withdraw");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        isWithdrawn = true;
        emit FundsWithdrawn(msg.sender, amount);
    }
}