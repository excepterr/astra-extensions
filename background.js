let blockedCount = 0;
let isEnabled = true;

async function updateFilters() {
    try {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ['ruleset'],
            enableRulesetIds: isEnabled ? ['ruleset'] : []
        });
        console.log("Filters updated");
    } catch (error) {
        console.error("Error updating filters:", error);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getBlockedCount") {
        sendResponse({ count: blockedCount });
    } else if (request.action === "toggleEnabled") {
        isEnabled = request.enabled;
        updateFilters();
        sendResponse({ success: true });
    }
    return true;
});

chrome.declarativeNetRequest.onRuleMatched.addListener((info) => {
    if (!isEnabled) return;
    
    blockedCount++;
    chrome.runtime.sendMessage({
        action: "updateBlockedCount",
        count: blockedCount
    });
});

updateFilters();
setInterval(updateFilters, 6 * 60 * 60 * 1000);