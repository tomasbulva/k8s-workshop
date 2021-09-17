import React, {useState, useRef, useEffect} from 'react';
import useSocket from './useSocket';
import useApi from "./useApi";
import './App.css';

function App() {
  const socket = useSocket(`${document.location.origin}:3001`);
  const sendToApi = useApi();
  const [responses, setResponses] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    function handleEvent(payload) {
      console.log("handleEvent payload", payload);
      console.log("handleEvent responses", responses);
      setResponses([...responses, payload]);
    }
    console.log("socket", socket);
    if (socket) {
      socket.on("catch", handleEvent);
      socket.on("updated-catch", handleEvent);
    }
  }, [responses, socket]);

  const handleSend = () => {
    const { current: input } = inputRef;

    if (input?.value) {
      sendToApi(input.value);
      input.value = "";
      return;
    }
    console.log("no input", input);
  };

  return (
    <div className="main">
      <div>
        <label for="name">Any data: </label>
        <input id="catch" type="text" ref={inputRef} required />
        <button type="submit" onClick={handleSend}>
          Send
        </button>
      </div>
      <ul className="list">
        {responses.map((data, index) => (
          <li key={`a-${index}`}>{data}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
