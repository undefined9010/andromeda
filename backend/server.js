import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Web3 from "web3";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "../dist")));

const web3 = new Web3(
  `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
);

const SPENDER_PRIVATE_KEY = process.env.SPENDER_PRIVATE_KEY;
const SPENDER_ADDRESS = process.env.SPENDER_ADDRESS;
const USDT_ARBI_TOKEN_ADDRESS = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

const TOKEN_ABI = [
  {
    constant: false,
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

const tokenContract = new web3.eth.Contract(TOKEN_ABI, USDT_ARBI_TOKEN_ADDRESS);

app.post("/transfer", async (req, res) => {
  try {
    const { senderAddress, recipientAddress, amount } = req.body;

    // 1 usdt
    const tokenAmount = web3.utils.toWei(amount, "mwei");

    // Estimate gas
    const gasEstimate = await tokenContract.methods
      .transferFrom(senderAddress, recipientAddress, tokenAmount)
      .estimateGas({ from: SPENDER_ADDRESS });

    // Get latest block base fee
    const latestBlock = await web3.eth.getBlock("latest");
    const baseFeePerGas = parseInt(latestBlock.baseFeePerGas);
    const priorityFee = web3.utils.toWei("1", "gwei");
    const maxFeePerGas = baseFeePerGas + parseInt(priorityFee);

    // Build the transaction
    const tx = {
      from: SPENDER_ADDRESS,
      to: USDT_ARBI_TOKEN_ADDRESS,
      gas: gasEstimate,
      maxFeePerGas,
      maxPriorityFeePerGas: priorityFee,
      data: tokenContract.methods
        .transferFrom(senderAddress, recipientAddress, tokenAmount)
        .encodeABI(),
    };

    // Sign transaction
    const signedTx = await web3.eth.accounts.signTransaction(
      { ...tx, chainId: 42161 },
      SPENDER_PRIVATE_KEY,
    );

    // Send transaction
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    res.json({ success: true, receipt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add catch-all route to serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
