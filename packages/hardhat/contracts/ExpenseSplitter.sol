// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ExpenseSplitter {
    struct Expense {
        uint256 id;
        uint256 amount;
        bool isWithdrawn;
    }

    address public owner;
    mapping(address => Expense[]) public userExpenses;
    uint256 public nextExpenseId;

    event ExpenseAdded(address indexed payer, uint256 expenseId, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 expenseId, uint256 amount);

    constructor() {
        owner = msg.sender;
        nextExpenseId = 1;
    }

    function addExpense(address[] memory _participants) public payable {
        require(msg.value > 0, "Must send ETH");
        require(_participants.length > 0, "No participants provided");

        uint256 share = msg.value / _participants.length;
        for (uint256 i = 0; i < _participants.length; i++) {
            userExpenses[_participants[i]].push(Expense(nextExpenseId, share, false));
        }

        emit ExpenseAdded(msg.sender, nextExpenseId, msg.value);
        nextExpenseId++;
    }

    function withdrawFunds(uint256 expenseId) public {
        Expense[] storage expenses = userExpenses[msg.sender];
        for (uint256 i = 0; i < expenses.length; i++) {
            if (expenses[i].id == expenseId && !expenses[i].isWithdrawn) {
                uint256 amount = expenses[i].amount;
                expenses[i].isWithdrawn = true;
                payable(msg.sender).transfer(amount);

                emit FundsWithdrawn(msg.sender, expenseId, amount);
                return;
            }
        }
        revert("No withdrawable funds found for this expenseId");
    }

    function getMyExpenses() public view returns (uint256[] memory, uint256[] memory, bool[] memory) {
        Expense[] storage expenses = userExpenses[msg.sender];
        uint256 length = expenses.length;

        uint256[] memory ids = new uint256[](length);
        uint256[] memory amounts = new uint256[](length);
        bool[] memory statuses = new bool[](length);

        for (uint256 i = 0; i < length; i++) {
            ids[i] = expenses[i].id;
            amounts[i] = expenses[i].amount;
            statuses[i] = expenses[i].isWithdrawn;
        }

        return (ids, amounts, statuses);
    }
}
