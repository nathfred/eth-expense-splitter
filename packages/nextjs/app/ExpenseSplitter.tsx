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
      deployedContracts.ExpenseSplitter.address,
      deployedContracts.ExpenseSplitter.abi,
      signer,
    );
    const addresses = participants.split(",").map(addr => addr.trim());
    await contract.addExpense(addresses, { value: ethers.parseEther(amount) });
  };

  return (
    <div>
      <h2>Decentralized Expense Splitter</h2>
      <input type="text" placeholder="Amount in ETH" onChange={e => setAmount(e.target.value)} />
      <input type="text" placeholder="Participants (comma-separated)" onChange={e => setParticipants(e.target.value)} />
      <button onClick={addExpense}>Add Expense</button>
    </div>
  );
};

export default ExpenseSplitter;
