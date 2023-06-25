import http from "http";
import ws, { WebSocketServer } from 'ws';
import {messagesService} from "../../../packages/messages/messages";

class Socket {
    private webSocketServer: ws.Server;
    private connectedClients: ws[];

    public constructor(server: http.Server) {
        this.webSocketServer = new WebSocketServer({ server });
        this.connectedClients = [];
    }

    public init() {
        this.webSocketServer.on('connection', (client) => {
            this.connectedClients.push(client);
            client.on('open', (msg: string) => {
                console.log(msg);
            });
            client.on('message', (msg: string) => {
                console.log(msg);
                for (const client of this.webSocketServer.clients) {
                    if (client.readyState === ws.OPEN) {
                        const { receiverId, senderId, content, dialogId } = JSON.parse(msg);
                        client.send(content);
                        messagesService.saveMessage({ receiverId, senderId, content, dialogId });
                    }
                }
            })
        });
    }
}

export { Socket };
