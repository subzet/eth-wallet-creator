import { Wallet, JsonRpcProvider, formatEther } from "ethers";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure Ethereum provider
const provider = new JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.ETHEREUM_API_KEY}`
);

async function createWalletAndCheckBalance() {
  // Create a random wallet
  const wallet = Wallet.createRandom();
  console.log(`Created wallet with address: ${wallet.address}`);

  // Connect the wallet to the Ethereum provider
  const connectedWallet = wallet.connect(provider);

  // Check the balance of the wallet
  const balance = await provider.getBalance(wallet.address);
  const etherBalance = formatEther(balance);
  console.log(`Wallet balance: ${etherBalance} ETH`);

  // Return wallet data
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    balance: etherBalance,
  };
}

createWalletAndCheckBalance()
  .then((wallet) => console.log("Wallet data:", wallet))
  .catch((error) => console.error("Error:", error));
