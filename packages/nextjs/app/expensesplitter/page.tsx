"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import deployedContracts from "~~/contracts/deployedContracts";

const ExpenseSplitter = () => {
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  // const [message, setMessage] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);

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
    await contract.addExpense(addresses, { value: ethers.parseEther(amount) });
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
    const funds = await contract.balances(await signer.getAddress());
    const isWithdrawn = await contract.isWithdrawn();
    setExpenses([
      { address: contract.target, funds: ethers.formatEther(funds), status: isWithdrawn ? "Withdrawn" : "Active" },
    ]);
  };

  const withdrawFunds = async () => {
    if (!window.ethereum) return alert("Install Metamask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      deployedContracts[31337].ExpenseSplitter.address,
      deployedContracts[31337].ExpenseSplitter.abi,
      signer,
    );
    await contract.withdrawFunds();
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold">Decentralized Expense Splitter</h2>
      <input
        className="p-2 border rounded"
        type="text"
        placeholder="Amount in ETH"
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
        {expenses.map((expense, index) => (
          <div key={index} className="p-4 border-b flex justify-between items-center">
            <span className="truncate w-2/3">{expense.address}</span>
            <span className="font-bold">{expense.funds} ETH</span>
            <span
              className={expense.status === "Withdrawn" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
            >
              {expense.status}
            </span>
            <span>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={withdrawFunds}>
                Withdraw
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseSplitter;
