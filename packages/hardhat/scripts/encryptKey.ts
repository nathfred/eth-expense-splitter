import { Wallet } from "ethers";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY; // Read plain-text private key from .env
const PASSWORD = process.env.ENCRYPTION_PASSWORD || "default_password"; // Set a password

if (!PRIVATE_KEY) {
  console.error("Private key not found in .env file!");
  process.exit(1);
}

async function encryptPrivateKey() {
  const wallet = new Wallet(PRIVATE_KEY);
  console.log("Encrypting private key...");

  const encryptedJson = await wallet.encrypt(PASSWORD);

  // Save to a file (optional)
  fs.writeFileSync("encrypted-key.json", encryptedJson);

  console.log("Encrypted Private Key:\n", encryptedJson);
  console.log("\nSaved as `encrypted-key.json`");
}

encryptPrivateKey();
