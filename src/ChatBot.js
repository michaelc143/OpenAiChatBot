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
  const [useImageBtn, setUseImageBtn] = useState(false);

  const handleImage = async (event) => {
    event.preventDefault();
    const response = await openai.createImage({
      prompt: input,
      n: 5,
      size: "1024x1024",
    });
    setResponse(response.data.data[0].url);
  };
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 500,
      temperature: 0,
    });
    setResponse(response.data.choices[0].text);
  };
    
  const submissionType = useImageBtn ? handleImage : handleSubmit;

  return (
    <div id='page'>
      <div className='logo-container-right'>
        <img className='logo' height='112.5rem' width='200rem' src='https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png'></img>
      </div>
      <div className='logo-container-left'>
        <img className='logo' height='112.5rem' width='200rem' src='https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png'></img>
      </div>
      <h1>Chatbot App</h1>
      <br />
      <span className='toggle-logo'>Toggle image mode (off by default):</span>
      <label class="toggle">
        <input type='checkbox' checked={useImageBtn} onChange={() => setUseImageBtn(!useImageBtn)} />
        <span class="slider"></span>
      </label>
      <form onSubmit={submissionType}>
        <label>
          Input:
          <input className='chat-input-box' type="text" value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
        <button type="submit" className='submit-btn'>Submit</button>
      </form>
      <p className='response-field'>Response: {response}</p>
    </div>
  );
}

export default ChatBot;
