import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

let provider;
let web3;

async function connectWallet() {
    try {
        provider = new WalletConnectProvider({
            rpc: {
                195: "https://api.trongrid.io" // Tron RPC
            }
        });

        await provider.enable();
        web3 = new Web3(provider);

        // Tron-Specific Account Fetching
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            alert("Wallet Connected: " + window.tronWeb.defaultAddress.base58);
        } else {
            alert("Connected, but no Tron address found.");
        }
    } catch (error) {
        console.error("Wallet connection failed", error);
        alert("Failed to connect wallet. Please try again.");
    }
}

// Add Event Listener to Button
document.getElementById("connectWallet").addEventListener("click", connectWallet);
