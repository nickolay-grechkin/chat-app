import { Server as SocketServer } from 'socket.io';
import {messagesService} from "../../../packages/messages/messages";

class Socket {
    public static init(server: any) {
        const io = new SocketServer(server);
        io.on('connection', (socket) => {
            socket.on('join room', roomId => {
                socket.join(String(roomId));
            });
            socket.on('message', message => {
                const { receiverId, senderId, content, dialogId } = message;
                messagesService.saveMessage({ receiverId, senderId, content, dialogId });
                socket.to(String(message.dialogId)).emit('message', message);
            });
            socket.on('leave room', roomId => {
               socket.leave(String(roomId));
            });
        });
    }
}

export { Socket };
