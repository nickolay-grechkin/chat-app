import { Server as SocketServer } from 'socket.io';
import {messagesService} from "../../domains/messages/messages";
import {SocketEvent} from "../../common/enums/enum";

class Socket {
    public static init(server: any) {
        const io = new SocketServer(server);
        io.on(SocketEvent.CONNECTION, (socket) => {
            socket.on(SocketEvent.JOIN_ROOM, (roomId: string) => {
                socket.join(roomId);
            });
            socket.on(SocketEvent.LEAVE_ROOM, (roomId: string) => {
                socket.leave(roomId);
            });
            socket.on(SocketEvent.MESSAGE, message => {
                const { userId, roomId, content } = message;
                messagesService.saveMessage({ userId, roomId, content });
                socket.to(String(roomId)).emit(SocketEvent.MESSAGE, message);
            });
        });
    }
}

export { Socket };
