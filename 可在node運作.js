const https = require("https");

const API_KEY = "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";
const MODEL = "gpt-3.5-turbo";
const URL = "https://api.openai.com/v1/chat/completions";

function chatGPT(message) {
  const data = JSON.stringify({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(URL, options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const result = responseData.split('"content":"')[1].split('"')[0];
        resolve(result);
      });
    });

    req.on("error", (error) => {
      reject(new Error(error.message));
    });

    req.write(data);
    req.end();
  });
}

// Example usage
chatGPT("日本5天行程")
  .then((response) => {
    const result = response.replace(/\\n/g, "\n"); // 將 "\\n" 轉換為 "\n"
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
