import React, {useEffect, useState} from 'react'

import './App.css'
import {io} from "socket.io-client";

const socket = io('ws://localhost:4321', {
    transports: ['websocket']
});

function App() {

    const [message, setMessage] = useState<string>();

    useEffect(() => {
       socket.emit("join room", 1);
       socket.on("message", (message) => {
          console.log("Message: ", message);
       });
    }, []);

    const handleSendMessage = () => {
        socket.emit('message', { dialogId: 1, senderId: 1, receiverId: 0, content: message});
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    return (
        <>
            <input value={message} onChange={handleChange} />
            <button onClick={handleSendMessage}>Send</button>
        </>
    );
}

export default App
