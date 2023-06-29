import {Controller} from "../common/classes/classes";
import {AppEndpoint, HttpMethod, HttpStatus} from "../../common/enums/enum";
import {Request, Response} from "express";
import {MessageService} from "./message.service";

class MessagesController extends Controller{
    private messagesService: MessageService
    constructor(messagesService: MessageService) {
        super();
        this.messagesService = messagesService

        this.addRoute({
           path: AppEndpoint.MESSAGE,
           method: HttpMethod.POST,
           handler: (req, res) => this.saveMessage(req, res)
        });

        this.addRoute({
            path: AppEndpoint.MESSAGE,
            method: HttpMethod.GET,
            handler: (req, res) => this.getMessagesByRoomId(req, res)
        })
    }

    private async saveMessage(req: Request, res: Response) {
        try {
            await this.messagesService.saveMessage(req.body);
            res.status(HttpStatus.SUCCESS).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getMessagesByRoomId(req: Request, res: Response) {
        try {
            const { roomId } = req.query;
            if (!roomId) {
                throw Error("Dialog id query parameter is missing");
            }

            res.status(HttpStatus.SUCCESS).send(await this.messagesService.getMessagesByRoomId(Number(roomId)));
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export { MessagesController };
