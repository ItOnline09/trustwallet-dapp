async function waitForTronLink() {
    return new Promise((resolve) => {
        let attempts = 0;
        const checkInterval = setInterval(() => {
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                clearInterval(checkInterval);
                resolve(true);
            } else if (attempts > 10) { // Waits for ~5 seconds (10 * 500ms)
                clearInterval(checkInterval);
                resolve(false);
            }
            attempts++;
        }, 500); // Check every 500ms
    });
}

async function connectWallet() {
    if (!window.tronWeb) {
        alert("Please install TronLink wallet and refresh the page.");
        return;
    }

    const isUnlocked = await waitForTronLink();

    if (!isUnlocked) {
        alert("Please unlock your TronLink wallet and try again.");
        return;
    }

    const walletAddress = window.tronWeb.defaultAddress.base58;
    alert("Wallet Connected: " + walletAddress);
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
