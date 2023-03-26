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
      <div className='prev-imgs'>
        <h2>Previously generated images</h2>
        <img className='prev-img-1' src='https://oaidalleapiprodscus.blob.core.windows.net/private/org-9IPrvi2e2c008RGzLDIszUvf/user-IJb8MhT9pz3ezcnJqsj7oDIZ/img-qrxJYcELPa3A9bOHmB6tQ0vY.png?st=2023-03-26T00%3A21%3A24Z&se=2023-03-26T02%3A21%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-25T22%3A33%3A28Z&ske=2023-03-26T22%3A33%3A28Z&sks=b&skv=2021-08-06&sig=NXPXqDGmV0jr%2BxrhLAqvip66suAiLTTYgSGjZR9dlnA%3D'></img>
        <img className='prev-img-2' src='https://oaidalleapiprodscus.blob.core.windows.net/private/org-9IPrvi2e2c008RGzLDIszUvf/user-IJb8MhT9pz3ezcnJqsj7oDIZ/img-BCmjZbX2barwRWMQ9mHgD9Tz.png?st=2023-03-26T00%3A31%3A10Z&se=2023-03-26T02%3A31%3A10Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-25T22%3A35%3A20Z&ske=2023-03-26T22%3A35%3A20Z&sks=b&skv=2021-08-06&sig=qeaYsGR7RiiUPiTDVAO2FCGMpGVccywKurShZG8CgK4%3D'/>
        <img className='prev-img-3' src='https://oaidalleapiprodscus.blob.core.windows.net/private/org-9IPrvi2e2c008RGzLDIszUvf/user-IJb8MhT9pz3ezcnJqsj7oDIZ/img-UgSRghUe2xOlAo8qSQm1cLwV.png?st=2023-03-26T00%3A33%3A11Z&se=2023-03-26T02%3A33%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-25T22%3A34%3A02Z&ske=2023-03-26T22%3A34%3A02Z&sks=b&skv=2021-08-06&sig=zXmo%2BcUEIrKLJQ8c1B70rf0STeeh3hwOcFLIK5YkM3A%3D'/>
        <img className='prev-img-4' src='https://oaidalleapiprodscus.blob.core.windows.net/private/org-9IPrvi2e2c008RGzLDIszUvf/user-IJb8MhT9pz3ezcnJqsj7oDIZ/img-BzuXKFsvSVguN0KFJbPqR5nH.png?st=2023-03-26T00%3A37%3A19Z&se=2023-03-26T02%3A37%3A19Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-25T22%3A36%3A15Z&ske=2023-03-26T22%3A36%3A15Z&sks=b&skv=2021-08-06&sig=rPrSn8BFYteFI2iUvuCUozK0YY5uytX61Q7PUVFDtPs%3D'/>
        <img className='prev-img-5' src='https://oaidalleapiprodscus.blob.core.windows.net/private/org-9IPrvi2e2c008RGzLDIszUvf/user-IJb8MhT9pz3ezcnJqsj7oDIZ/img-jbVRP0ZF7FYXseAabieJ5Ja6.png?st=2023-03-26T00%3A51%3A18Z&se=2023-03-26T02%3A51%3A18Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-25T22%3A33%3A48Z&ske=2023-03-26T22%3A33%3A48Z&sks=b&skv=2021-08-06&sig=LOqK4uibb6UTD63A/noXxTcXhN0WQksWlb368BEF%2Bt0%3D'/>
        <img className='prev-img-6' src='https://oaidalleapiprodscus.blob.core.windows.net/private/org-9IPrvi2e2c008RGzLDIszUvf/user-IJb8MhT9pz3ezcnJqsj7oDIZ/img-Q1uXFwBEe0ddvIdL0yGTy0mS.png?st=2023-03-26T00%3A53%3A55Z&se=2023-03-26T02%3A53%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-25T22%3A36%3A39Z&ske=2023-03-26T22%3A36%3A39Z&sks=b&skv=2021-08-06&sig=h4FP9iaM/rNJbfhH3Dxac0cni9fiZYjYux4wUNR1BHw%3D'/>
      </div>
    </div>
  );
}

export default ChatBot;
