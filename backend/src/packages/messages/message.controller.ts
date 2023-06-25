import {Controller} from "../../libs/packages/controller/controller";
import {AppEndpoint, HttpMethod, HttpStatus} from "../../shared/libs/enums/enum";
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
            handler: (req, res) => this.getMessagesByDialogId(req, res)
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

    private async getMessagesByDialogId(req: Request, res: Response) {
        try {
            const { dialogId } = req.query;
            if (!dialogId) {
                throw Error("Dialog id query parameter is missing");
            }

            res.status(HttpStatus.SUCCESS).send(await this.messagesService.getMessagesByDialogId(Number(dialogId)));
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export { MessagesController };
