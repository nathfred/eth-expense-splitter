"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import deployedContracts from "~~/contracts/deployedContracts";

const ExpenseSplitter = () => {
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<{ id: number; amount: string; status: string }[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async () => {
    if (!window.ethereum) return alert("Install Metamask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      deployedContracts[31337].ExpenseSplitter.address,
      deployedContracts[31337].ExpenseSplitter.abi,
      signer,
    );

    const addresses = participants.map(addr => addr.trim());
    const tx = await contract.addExpense(addresses, { value: ethers.parseEther(amount) });
    await tx.wait();
    fetchExpenses();
  };

  const fetchExpenses = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      deployedContracts[31337].ExpenseSplitter.address,
      deployedContracts[31337].ExpenseSplitter.abi,
      signer,
    );

    const [ids, amounts, statuses] = await contract.getMyExpenses();
    const formattedExpenses = ids.map((id: bigint, index: number) => ({
      id: Number(id),
      amount: ethers.formatEther(amounts[index]),
      status: statuses[index] ? "Withdrawn" : "Active",
    }));

    setExpenses(formattedExpenses);
  };

  const withdrawFunds = async (expenseId: number) => {
    if (!window.ethereum) return alert("Install Metamask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      deployedContracts[31337].ExpenseSplitter.address,
      deployedContracts[31337].ExpenseSplitter.abi,
      signer,
    );

    const tx = await contract.withdrawFunds(expenseId);
    await tx.wait();
    fetchExpenses();
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold">Decentralized Expense Splitter</h2>
      <input
        className="p-2 border rounded"
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      {participants.map((participant, index) => (
        <input
          key={index}
          className="p-2 border rounded"
          type="text"
          placeholder="Participant Address"
          value={participant}
          onChange={e =>
            setParticipants([...participants.slice(0, index), e.target.value, ...participants.slice(index + 1)])
          }
        />
      ))}
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={() => setParticipants([...participants, ""])}
      >
        Add Participant
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={addExpense}>
        Add Expense
      </button>
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={fetchExpenses}>
        Refresh Expenses
      </button>
      <div className="w-full bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">My Expense Splitters</h3>
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <div key={index} className="p-4 border-b flex justify-between items-center">
              <span className="w-1/3">ID: {expense.id}</span>
              <span className="font-bold">{expense.amount} ETH</span>
              <span
                className={
                  expense.status === "Withdrawn" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                }
              >
                {expense.status}
              </span>
              {!expense.status.includes("Withdrawn") && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => withdrawFunds(expense.id)}
                >
                  Withdraw
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No expenses found</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseSplitter;
