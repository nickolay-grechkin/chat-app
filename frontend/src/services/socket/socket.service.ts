import {io, Socket} from "socket.io-client";

class SocketService {
    private socket:  Socket;

    constructor() {
        this.socket = io('ws://localhost:4321', {
            transports: ['websocket']
        });
    }

    public joinRoom(roomId: number) {
        this.socket.emit("join room", String(roomId));
    }

    public hasMessageListeners(): boolean {
        return !this.socket.hasListeners('message')
    }

    public sendMessage(message: any) {
        this.socket.emit('message', message);
    }

    public receiveMessage(receiveMessageCallback: (message: any) => void) {
        this.socket.on("message", receiveMessageCallback);
    }

}

export { SocketService };
