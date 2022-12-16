import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const GPT = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    // Replace YOUR_API_KEY and YOUR_MODEL_NAME with your own API key and model name
    const apiKey = "YOUR_API_KEY";
    const model = "YOUR_MODEL_NAME";

    const response = await fetch(
      `https://api.openai.com/v1/models/${model}/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: input,
          temperature: 0.5,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      }
    );

    const data = await response.json();
    setOutput(data.choices[0].text);
  };
};

export default GPT;
