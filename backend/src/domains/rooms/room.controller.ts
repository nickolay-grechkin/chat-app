import {Controller} from "../common/classes/classes";
import {RoomService} from "./room.service";
import {HttpMethod} from "../../common/enums/httpMethod";
import {Request, Response} from "express";
import {HttpStatus} from "../../common/enums/enum";

class RoomController extends Controller {
    private roomService: RoomService;

    constructor(roomService: RoomService) {
        super();

        this.roomService = roomService;

        this.addRoute({
            path: '/rooms',
            method: HttpMethod.GET,
            handler: (req, res) => this.getAllRoomsByUserId(req, res)
        });
    }

    private async getAllRoomsByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.query;

            const rooms = await this.roomService.getAllRoomsByUserId(Number(userId));

            res.status(HttpStatus.SUCCESS).send(rooms);
        } catch {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export { RoomController };
