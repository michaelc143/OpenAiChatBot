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
      n: 1,
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
      Image btn<input type='checkbox' checked={useImageBtn} onChange={() => setUseImageBtn(!useImageBtn)}></input>
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
