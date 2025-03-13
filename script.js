async function connectWallet() {
    if (!window.tronLink) {
        alert("Please install TronLink wallet and refresh the page.");
        return;
    }

    // Request TronLink permission
    try {
        await window.tronLink.request({ method: "tron_requestAccounts" });

        // Wait until TronLink provides an address
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

document.getElementById("connectWallet").addEventListener("click", connectWallet);
