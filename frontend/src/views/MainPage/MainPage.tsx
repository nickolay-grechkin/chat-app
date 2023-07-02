import React, {JSX, useEffect, useMemo, useState} from "react";
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
    const [roomId, setRoomId] = useState<number>();

    const userId = useMemo(() => localStorage.getItem('userId'), []);

    useEffect(() => {
        if (!socket.hasListeners('message')) {
            socket.on("message", (message) => {
                setMessages((prevState) => [...prevState, message]);
            });
        }
    }, []);

    useEffect(() => {
        const getAllRoomsByUserId = async () => {
            if (userId) {
                const response = await ApiService.getAllRoomsByUserId(userId);
                setRooms(response.data);
            }
        }

        getAllRoomsByUserId();
    }, []);

    const handleSendMessage = () => {
        setMessages((prevState) => [...prevState, { userId, roomId, content: message}]);
        socket.emit('message', { userId, roomId, content: message});
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const handleRoomClick = async (roomId: number) => {
        const response = await ApiService.getAllMessageByRoomId(String(roomId));
        // TODO Replace with roomID
        socket.emit("join room", '0');
        setRoomId(roomId);
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
        </div>
    );
}

export { MainPage };
