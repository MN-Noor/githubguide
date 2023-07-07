(() => {
  console.log("Hello");
  let currenturl;
  let dataarray = [];
  let index=-1;

  const CodeToExplanation = (code) => {
    return new Promise((resolve, reject) => {
      fetch("https://api.ai21.com/studio/v1/j2-ultra/complete", {
        headers: {
          "Authorization": "Bearer 8Jv0BHRVmOjcn6fZhnGCZQTd4buvAYzZ",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "prompt": "format the output as in this format\n description :{short overall description of code}\n\n and important functions and variable in this format\n function/variable name :{functionality} \n \n" + code,
          "numResults": 1,
          "maxTokens": 1754,
          "temperature": 0.7,
          "topKReturn": 0,
          "topP": 1,
          "countPenalty": {
            "scale": 0,
            "applyToNumbers": false,
            "applyToPunctuations": false,
            "applyToStopwords": true,
            "applyToWhitespaces": false,
            "applyToEmojis": false
          },
          "frequencyPenalty": {
            "scale": 0,
            "applyToNumbers": false,
            "applyToPunctuations": false,
            "applyToStopwords": true,
            "applyToWhitespaces": false,
            "applyToEmojis": false
          },
          "presencePenalty": {
            "scale": 0,
            "applyToNumbers": false,
            "applyToPunctuations": true,
            "applyToStopwords": true,
            "applyToWhitespaces": false,
            "applyToEmojis": false
          },
          "stopSequences": ["###"]
        }),
        method: "POST"
      })
        .then(response => response.json())
        .then(date => {
          dataarray.push(date.completions[0].data.text);
          console.log(dataarray[dataarray.length - 1]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const showAlert = () => {
    console.log("This is the button", dataarray.length);

    index = (index+1) % dataarray.length;

    const desc = dataarray[index] ? dataarray[index].replace(/\n/g, "<br>") : "";

    const styles = `
        .alert {
          padding: 20px;
          background-color:#ADD8E6;
          color: black;
          opacity: 1;
          transition: opacity 0.8s;
          margin-bottom: 15px;
          
          font-size: 15px;
          border-radius: 25px;
        }
        
        .alert.info {
          background-color:#ADD8E6;
        }
        
        .closebtn {
          margin-left: 15px;
          color: white;
          font-weight: bold;
          float: right;
          font-size: 22px;
          line-height: 20px;
          cursor: pointer;
          transition: 0.3s;
          
        }
        
        .closebtn:hover {
          color: black;
        }
      `;

      const styleElement = document.createElement("style");
      styleElement.textContent = styles;

      document.head.appendChild(styleElement);

      const alertContainer = document.createElement("div");
      alertContainer.classList.add("alert", "info");

      const closeButton = document.createElement("span");
      closeButton.classList.add("closebtn");
      closeButton.innerHTML = "&times;";

      const strongElement = document.createElement("strong");
      strongElement.textContent = "Code Explanation:";

      const messageElement = document.createElement("span");
      messageElement.innerHTML = "<br>"+desc;

      closeButton.addEventListener("click", () => {
        alertContainer.style.opacity = 0;
        setTimeout(() => {
          alertContainer.remove();
        }, 600);
      });

      alertContainer.appendChild(closeButton);
      alertContainer.appendChild(strongElement);
      alertContainer.appendChild(messageElement);

      document.body.appendChild(alertContainer);
      document.getElementsByClassName("Box-sc-g0xbh4-0 eYedVD");
      alertParent.appendChild(alertContainer);


      
  };

  const explanationshow = () => {
    console.log("hello");

    const descBtnExists = document.getElementsByClassName("desc-btn")[0];
    if (!descBtnExists) {
      const descBtn = document.createElement("img");
      descBtn.src = chrome.runtime.getURL("assets/desc-icon2.png")
      descBtn.className = "git-button desc-btn";
      descBtn.title = "description";

      const git_lft_cont = document.getElementsByClassName("Box-sc-g0xbh4-0 iBylDf")[0];
      git_lft_cont.appendChild(descBtn);

      descBtn.addEventListener("click", showAlert);
    }
  };

  const handleMessage = (obj, sender, response) => {
    const { type, value, url } = obj;

    if (type === "GITHUB_BLOB") {
      currenturl = url;
      const textarea = document.querySelector('#read-only-cursor-text-area');
      if (textarea) {
        const code = textarea.textContent;

        CodeToExplanation(code)
          .then(() => {
            explanationshow();
          })
          .catch((error) => {
            console.error("error");
          });
      }
    }
  };

  chrome.runtime.onMessage.addListener(handleMessage);

  explanationshow();
})();

    
