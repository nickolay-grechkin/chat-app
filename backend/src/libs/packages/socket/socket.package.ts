import http from "http";
import ws, { WebSocketServer } from 'ws';

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
                    }
                }
            })
        });
    }
}

export { Socket };
