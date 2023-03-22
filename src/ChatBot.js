import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './ChatBot.css';


function ChatBot() {
  const configuration = new Configuration({
      organization: "Your org here",
      apiKey: 'Your Key Here',
  });
  const openai = new OpenAIApi(configuration);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 50,
      temperature: 0,
    });

    setResponse(response.data.choices[0].text);
  };

  return (
    <div id='page'>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input className='chat-input-box' type="text" value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>Response: {response}</p>
    </div>
  );
}

export default ChatBot;
