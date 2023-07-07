
console.log("i am bc")
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("github.com") && tab.url.includes("/blob/")) {
      console.log("i am bc"+tab.url)
      chrome.tabs.sendMessage(tabId, {
        type: "GITHUB_BLOB",
        url: tab.url,
      });
    }
  });
  
