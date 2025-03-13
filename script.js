async function connectWallet() {
    if (!window.tronLink) {
        alert("Please install TronLink wallet and refresh the page.");
        return;
    }

    // Request TronLink to connect
    try {
        await window.tronLink.request({ method: "tron_requestAccounts" });

        // Wait until TronLink is unlocked and available
        let attempts = 0;
        while (!window.tronWeb?.defaultAddress?.base58 && attempts < 10) {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 500ms
            attempts++;
        }

        if (!window.tronWeb?.defaultAddress?.base58) {
            alert("Please unlock your TronLink wallet and try again.");
            return;
        }

        const walletAddress = window.tronWeb.defaultAddress.base58;
        alert("Wallet Connected: " + walletAddress);
    } catch (error) {
        console.error("Wallet connection failed", error);
        alert("Failed to connect wallet. Please try again.");
    }
}

// Function to add USDT (TRC20) Token to Tron Wallet
async function addUSDTToken() {
    if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
        alert("Please connect your TronLink wallet first!");
        return;
    }

    const usdtContract = "TGkxzkDKyMeq2T7edKnyjZoFypyzjkkssq";

    try {
        // Open TronScan to manually add USDT if automatic import fails
        window.open(`https://tronscan.org/#/token20/${usdtContract}`, "_blank");
        alert("You will be redirected to TronScan. Click 'Add to Wallet' there.");
    } catch (error) {
        console.error("Failed to add token", error);
        alert("Could not add USDT automatically. Please add it manually.");
    }
}

// Add event listeners to buttons
document.getElementById("con
