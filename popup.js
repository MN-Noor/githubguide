import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
   
  
    const container = document.getElementsByClassName("container")[0];
    
    const image = document.createElement("img");
    const text = document.createElement("div");
  
    if (activeTab.url.includes("github.com") && activeTab.url.includes("/blob/")) {
      
      text.innerHTML = '<div class="title">Youre on a GitHub page<br>running....</div>';
      text.classList.add("blue-text");
    } else {
      text.innerHTML ='<div class="title">Youre not on a GitHub Code page.</div>';
      text.classList.add("red-text");
    }
    
    container.appendChild(image);
    container.appendChild(text);
  });
  
  