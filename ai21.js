fetch("https://api.ai21.com/studio/v1/j2-ultra/complete", {
  headers: {
    "Authorization": "8",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
      "prompt": "format the output as in this format\n description :{description of whole code}\n and important functions and variable in this format\n 1-function/variable name :{functionality}  /n"+code,
      "numResults": 1,
      "maxTokens": 959,
      "temperature": 0.7,
      "topKReturn": 0,
      "topP":0.71,
      "countPenalty": {
        "scale": 0,
        "applyToNumbers": false,
        "applyToPunctuations": false,
        "applyToStopwords": false,
        "applyToWhitespaces": false,
        "applyToEmojis": false
      },
      "frequencyPenalty": {
        "scale": 0,
        "applyToNumbers": false,
        "applyToPunctuations": false,
        "applyToStopwords": false,
        "applyToWhitespaces": false,
        "applyToEmojis": false
      },
      "presencePenalty": {
        "scale": 0,
        "applyToNumbers": false,
        "applyToPunctuations": false,
        "applyToStopwords": false,
        "applyToWhitespaces": false,
        "applyToEmojis": false
      },
      "stopSequences":[]
    }),
  method: "POST"
});