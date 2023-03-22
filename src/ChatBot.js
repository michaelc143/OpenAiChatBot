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
    var imageChecked = false; //true if image btn is selected
    //check if box is checked
    document.getElementById('img-btn').onclick = function() {
      imageChecked = true;
    };
    
    //img generation mode
    if(imageChecked) {
      //For image creation
      //const response = await openai.createImage({
      //  prompt:input,
      //  n:1, (n is number of imgs)
      //  size="1024x1024", (size of output imgs)
      //});
      //setResponse(response.data.data[0].url);
    }
    
    //text chat generation mode
    else {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 50,
        temperature: 0,
      });

      setResponse(response.data.choices[0].text); 
    }
  };

  return (
    <div id='page'>
      <form onSubmit={handleSubmit}>
        <button id='img-btn' type='checkbox'>Select checkbox for image generation mode</button>
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
