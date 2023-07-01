import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import {Message} from "semantic-ui-react";
import {io} from "socket.io-client";
import {ApiService} from "../../services/api-service.ts";

const socket = io('ws://localhost:4321', {
    transports: ['websocket']
});

const MainPage = (): JSX.Element => {
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
        const getAllRoomsByUserId = async () => {
            const response = await ApiService.getAllRoomsByUserId('0');
            setRooms(response.data);
        }
        getAllRoomsByUserId();
    }, []);

    const handleSendMessage = () => {
        setMessages((prevState) => [...prevState, { userId: 0, roomId: 0, content: message}]);
        socket.emit('message', { userId: 0, roomId: 0, content: message});
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const handleRoomClick = async (roomId: number) => {
        const response = await ApiService.getAllMessageByRoomId(String(roomId));
        setMessages(response.data);
    }

    if (!rooms) {
        return <></>;
    }

    return (
        <div className='wrapper'>
            <div className='sidebar'>
                {rooms?.map(({ id, lastMessage }) => (
                    <div className='room' key={id} onClick={() => handleRoomClick(id)}>{lastMessage}</div>
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

export { MainPage };
