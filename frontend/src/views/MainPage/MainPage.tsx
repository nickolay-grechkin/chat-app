import React, {JSX, useEffect, useMemo, useState} from "react";
import {Message} from "semantic-ui-react";
import {ApiService} from "../../services/api.service.ts";
import {socketService} from "../../services/socket/socket.ts";

const MainPage = (): JSX.Element => {
    const [message, setMessage] = useState<string>();
    const [messages, setMessages] = useState<any[]>([]);
    const [rooms, setRooms] = useState<any[]>();
    const [roomId, setRoomId] = useState<number>();
    const [isInviteModalOpened, setIsInviteModalOpened] = useState(false);

    const userId = useMemo(() => localStorage.getItem('userId'), []);

    useEffect(() => {
        if (socketService.hasMessageListeners()) {
            socketService.receiveMessage((message) => {
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
        const messageForSending = { userId, roomId, content: message};

        setMessages((prevState) => [...prevState, messageForSending]);
        socketService.sendMessage(messageForSending)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const handleRoomClick = async (roomId: number) => {
        const response = await ApiService.getAllMessageByRoomId(String(roomId));
        setRoomId(roomId);
        setMessages(response.data);
        socketService.joinRoom(roomId);
    }

    if (!rooms) {
        return <></>;
    }

    return (
        <div className='wrapper'>
            <div className='sidebar'>
                <button className='invite_modal_button' onClick={() => setIsInviteModalOpened(prevState => !prevState)} />
                <dialog open={isInviteModalOpened}>
                    <div>Email</div>
                    <button>Find</button>
                </dialog>
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
