import http from "http";
import ws, { WebSocketServer } from 'ws';
import {messagesService} from "../../../packages/messages/messages";
import { Server as SocketServer } from 'socket.io';
// class Socket {
//     private webSocketServer: ws.Server;
//     private connectedClients: ws[];
//
//     public constructor(server: http.Server) {
//         this.webSocketServer = new WebSocketServer({ server });
//         this.connectedClients = [];
//     }
//
//     public init() {
//         this.webSocketServer.on('connection', (client) => {
//             this.connectedClients.push(client);
//             client.on('open', (msg: string) => {
//                 console.log(msg);
//             });
//             client.on('message', (msg: string) => {
//                 console.log(msg);
//                 for (const client of this.webSocketServer.clients) {
//                     if (client.readyState === ws.OPEN) {
//                         const { receiverId, senderId, content, dialogId } = JSON.parse(msg);
//                         client.send(content);
//                         messagesService.saveMessage({ receiverId, senderId, content, dialogId });
//                     }
//                 }
//             })
//         });
//     }
// }

class Socket {
    io: any;

    public static init(server: any) {
        const io = new SocketServer(server);
        console.log('Connected');
        io.on('connection', (socket) => {
            socket.on('join room', roomId => {
                console.log("Join room");
                socket.join(roomId);
            });
            socket.on('leave room', roomId => {
               socket.leave(roomId);
            });
        });

    }
}

export { Socket };
