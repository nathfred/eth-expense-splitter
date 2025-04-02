"use client";

import { useState } from "react";
import { ethers } from "ethers";
import deployedContracts from "~~/contracts/deployedContracts";

const ExpenseSplitter = () => {
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const addParticipant = () => {
    setParticipants([...participants, ""]);
  };

  const updateParticipant = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const addExpense = async () => {
    if (!window.ethereum) return alert("Install Metamask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      deployedContracts[31337].ExpenseSplitter.address,
      deployedContracts[31337].ExpenseSplitter.abi,
      signer,
    );
    await contract.addExpense(participants, { value: ethers.parseEther(amount) });
    setMessage("Expense added successfully!");
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
    setMessage("Funds withdrawn successfully!");
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
          onChange={e => updateParticipant(index, e.target.value)}
        />
      ))}
      <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={addParticipant}>
        Add Participant
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={addExpense}>
        Add Expense
      </button>
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={withdrawFunds}>
        Withdraw
      </button>
      {message && <div className="p-2 mt-4 text-white bg-green-400 rounded">{message}</div>}
    </div>
  );
};

export default ExpenseSplitter;
