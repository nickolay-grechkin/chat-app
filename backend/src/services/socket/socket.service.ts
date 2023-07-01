import { Server as SocketServer } from 'socket.io';
import {messagesService} from "../../domains/messages/messages";

class Socket {
    public static init(server: any) {
        const io = new SocketServer(server);
        io.on('connection', (socket) => {
            socket.on('join room', roomId => {
                socket.join(String(roomId));
            });
            socket.on('message', message => {
                const { userId, roomId, content } = message;
                messagesService.saveMessage({ userId, roomId, content });
                socket.to(String(roomId)).emit('message', message);
            });
            socket.on('leave room', roomId => {
               socket.leave(String(roomId));
            });
        });
    }
}

export { Socket };
