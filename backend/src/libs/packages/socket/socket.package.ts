import http from "http";
import ws, { WebSocketServer } from 'ws';
import {messagesService} from "../../../packages/messages/messages";

class Socket {
    private webSocketServer: ws.Server;

    public constructor(server: http.Server) {
        this.webSocketServer = new WebSocketServer({ server });
    }

    public init() {
        this.webSocketServer.on('connection', (client) => {
            console.log('Client connected !')
            client.on('message', (msg: string) => {
                for (const client of this.webSocketServer.clients) {
                    if (client.readyState === ws.OPEN) {
                        const parsedRequest = JSON.parse(msg);
                        client.send(parsedRequest.message);
                        const { receiverId, senderId, content, dialogId } = parsedRequest;
                        messagesService.saveMessage({ receiverId, senderId, content, dialogId });
                    }
                }
            })
        });
    }
}

export { Socket };
