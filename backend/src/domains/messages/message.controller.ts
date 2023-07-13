import {Controller} from "../common/classes/classes";
import {AppEndpoint, HttpMethod, HttpStatus} from "../../common/enums/enum";
import {NextFunction, Request, Response} from "express";
import {MessageService} from "./message.service";

class MessagesController extends Controller{
    private messagesService: MessageService
    constructor(messagesService: MessageService) {
        super();
        this.messagesService = messagesService

        this.addRoute({
           path: AppEndpoint.MESSAGE,
           method: HttpMethod.POST,
           handler: (req, res, next) => this.saveMessage(req, res, next)
        });

        this.addRoute({
            path: AppEndpoint.MESSAGE,
            method: HttpMethod.GET,
            handler: (req, res, next) => this.getMessagesByRoomId(req, res, next)
        })
    }

    private async saveMessage(req: Request, res: Response, next: NextFunction) {
        try {
            await this.messagesService.saveMessage(req.body);
            res.status(HttpStatus.SUCCESS).send();
        } catch (error) {
            next(error)
        }
    }

    private async getMessagesByRoomId(req: Request, res: Response, next: NextFunction) {
        try {
            const { roomId } = req.query;

            res.status(HttpStatus.SUCCESS).send(await this.messagesService.getMessagesByRoomId(Number(roomId)));
        } catch (error) {
            next(error);
        }
    }
}

export { MessagesController };
