import React, {useEffect, useState} from 'react'

import './App.css'
import {io} from "socket.io-client";
import axios from "axios";
import {Message} from "semantic-ui-react";

const socket = io('ws://localhost:4321', {
    transports: ['websocket']
});

function App() {
    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTY4NzQ1MzEzMCwiZXhwIjoxNjg4MzE3MTMwfQ.yn4srNZ6cpzO18Ql_mc4X926Mwot6MMl-QYXw8sN8vs`;

    const [message, setMessage] = useState<string>();
    const [messages, setMessages] = useState<any[]>([]);
    const [rooms, setRooms] = useState<any[]>();

    useEffect(() => {
       socket.emit("join room", 0);
       socket.on("message", (message) => {
          console.log("Message: ", message);
       });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4321/rooms?userId=0').then((res) => setRooms(res.data));
    }, []);

    const handleSendMessage = () => {
        setMessages((prevState) => [...prevState, { userId: 0, roomId: 0, content: message}]);
        socket.emit('message', { userId: 0, roomId: 0, content: message});
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const handleRoomClick = (roomId: number) => {
        axios
            .get(`http://localhost:4321/message?roomId=${roomId}`)
            .then(res => setMessages(res.data));
    }

    if (!rooms) {
        return <></>;
    }

    return (
        <div className='wrapper'>
            <div className='sidebar'>
                {rooms?.map(room => (
                    <div className='room' onClick={() => handleRoomClick(room.id)}>{room.lastMessage}</div>
                ))}
            </div>
            <div className="messages-feed">
                <div className="messages-list">
                    {messages && messages.map(({ content, id, userId }) => (
                        <Message className={`message ${userId === 0 ? 'own-message' : 'received-message'}`} key={id} content={content} />
                    ))}
                </div>
                <div className='text-area-wrapper'>
                    <textarea onChange={handleChange} />
                    <button onClick={handleSendMessage} className='send-button'>Send</button>
                </div>
            </div>
            {/*<input value={message} onChange={handleChange} />*/}
            {/*<button onClick={handleSendMessage}>Send</button>*/}
        </div>
    );
}

export default App
