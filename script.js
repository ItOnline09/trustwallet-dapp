async function connectWallet() {
    try {
        // Check if TronLink is installed
        if (!window.tronWeb) {
            alert("Please install TronLink wallet and refresh the page.");
            return;
        }

        // Ensure TronLink is ready
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!window.tronWeb.defaultAddress.base58) {
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

document.getElementById("connectWallet").addEventListener("click", connectWallet);
