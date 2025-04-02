"use client";

import { useState } from "react";
import { ethers } from "ethers";
import deployedContracts from "~~/contracts/deployedContracts";

const ExpenseSplitter = () => {
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState("");

  const addExpense = async () => {
    if (!window.ethereum) return alert("Install Metamask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      deployedContracts[31337].ExpenseSplitter.address,
      deployedContracts[31337].ExpenseSplitter.abi,
      signer,
    );
    const addresses = participants.split(",").map(addr => addr.trim());
    await contract.addExpense(addresses, { value: ethers.parseEther(amount) });
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
    <div>
      <h2>Decentralized Expense Splitter</h2>
      <input type="text" placeholder="Amount in ETH" onChange={e => setAmount(e.target.value)} />
      <input type="text" placeholder="Participants (comma-separated)" onChange={e => setParticipants(e.target.value)} />
      <button onClick={addExpense}>Add Expense</button>

      <h3>Withdraw Funds</h3>
      <button onClick={withdrawFunds}>Withdraw</button>
    </div>
  );
};

export default ExpenseSplitter;
